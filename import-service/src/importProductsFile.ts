import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import type { APIGatewayProxyEvent } from 'aws-lambda';
import { errorResponse, successResponse } from './utils/apiResponseBuilder';

const { AWS_BUCKET_NAME, AWS_FOLDER_NAME } = process.env;

const s3Client = new S3Client({ region: process.env.REGION });

export const importProductsFile = () => async (event: APIGatewayProxyEvent) => {
  try {
    const catalogName = event.queryStringParameters.name;
    const catalogPath = `${AWS_FOLDER_NAME}/${catalogName}`;

    const command = new PutObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: catalogPath,
      ContentType: 'text/csv',
    });

    const url = await getSignedUrl(s3Client, command, {
      expiresIn: 60,
    });

    return successResponse({ url });
  } catch (error) {
    return errorResponse(error);
  }
};
