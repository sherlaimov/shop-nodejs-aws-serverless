import type { APIGatewayProxyEvent } from 'aws-lambda';
import { errorResponse, successResponse } from './utils/apiResponseBuilder';

const { AWS_BUCKET_NAME, AWS_FOLDER_NAME } = process.env;

export const importProductsFile =
  ({ s3 }: { s3: AWS.S3 }) =>
  async (event: APIGatewayProxyEvent) => {
    try {
      const catalogName = event.queryStringParameters.name;
      const catalogPath = `${AWS_FOLDER_NAME}/${catalogName}`;

      const params = {
        Bucket: AWS_BUCKET_NAME,
        Key: catalogPath,
        Expires: 60,
        ContentType: 'text/csv',
      };

      const url = await s3.getSignedUrlPromise('putObject', params);

      return successResponse(url);
    } catch (error) {
      errorResponse(error);
    }
  };
