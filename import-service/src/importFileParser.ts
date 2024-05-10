import csv from 'csv-parser';
import {
  S3Client,
  DeleteObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { type S3Event } from 'aws-lambda';

import { winstonLogger as logger } from './utils/winstonLogger';

const { AWS_BUCKET_NAME, REGION, SQS_URL } = process.env;
const s3Client = new S3Client({ region: REGION });
const sqsClient = new SQSClient({ region: REGION });

const sendCsvDataToSqs = async (data: unknown[]) => {
  logger.logRequest('Sending CSV to SQS');

  const messages = data.map((item) =>
    sqsClient.send(
      new SendMessageCommand({
        QueueUrl: SQS_URL,
        MessageBody: JSON.stringify(item),
      })
    )
  );

  await Promise.all(messages);
};
export const importFileParser =
  ({ s3 }: { s3: AWS.S3 }) =>
  async (event: S3Event) => {
    if (!event.Records) {
      logger.logError('Record not found in importFileParser.ts lambda.');
      return;
    }

    try {
      for (const record of event.Records) {
        const s3Stream = s3
          .getObject({
            Bucket: AWS_BUCKET_NAME,
            Key: record.s3.object.key,
          })
          .createReadStream();

        const csvData = [];
        await new Promise((resolve, reject) => {
          s3Stream
            ?.pipe(csv())
            .on('data', (data: string) => {
              csvData.push(data);
            })
            .on('error', reject)
            .on('end', resolve);
        });

        const putObjectParams = {
          Bucket: AWS_BUCKET_NAME,
          Key: record.s3.object.key.replace('uploaded', 'parsed'),
          Body: JSON.stringify(csvData),
        };

        await s3Client.send(new PutObjectCommand(putObjectParams));

        logger.logRequest(
          `File copied into ${AWS_BUCKET_NAME}/${record.s3.object.key.replace('uploaded', 'parsed')}`
        );

        const deleteObjectParams = {
          Bucket: AWS_BUCKET_NAME,
          Key: record.s3.object.key,
        };

        await s3Client.send(new DeleteObjectCommand(deleteObjectParams));

        logger.logRequest(
          `File deleted from ${AWS_BUCKET_NAME}/${record.s3.object.key}`
        );

        await sendCsvDataToSqs(csvData);
      }
    } catch (err) {
      logger.logError(err);
    }
  };
