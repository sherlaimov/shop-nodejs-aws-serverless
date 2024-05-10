import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { SQSEvent } from 'aws-lambda';

import { winstonLogger } from './utils/winstonLogger';
import { errorResponse, successResponse } from './utils/apiResponseBuilder';
import { ProductDto } from './models';
import { dynamoDBProductService as productService } from './services/dynamodb-product-service';

const snsClient = new SNSClient({ region: process.env.REGION });

const processRecords = async (event: SQSEvent) => {
  for (const record of event.Records) {
    winstonLogger.logRequest(`Processing record: ${record.body}`);

    const product: ProductDto = JSON.parse(record.body);

    winstonLogger.logRequest(`Product payload: ${product}`);

    await productService.create(product);

    const snsParams = {
      TopicArn: process.env.CREATE_PRODUCT_SNS_ARN,
      Subject: 'New product saved',
      Message: JSON.stringify(product),
      MessageAttributes: {
        title: {
          DataType: 'String',
          StringValue: product.title,
        },
      },
    };

    await snsClient.send(new PublishCommand(snsParams));
  }
};

export const catalogBatchProcessHandler = async (event: SQSEvent) => {
  try {
    await processRecords(event);
    return successResponse({ message: 'Products successfully saved' });
  } catch (error) {
    winstonLogger.logError(error);
    return errorResponse(error);
  }
};
