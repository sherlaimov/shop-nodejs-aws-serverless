import AWS from 'aws-sdk';
import * as handlers from './src';

const s3 = new AWS.S3({ region: process.env.REGION });

export const importFileParser = handlers.importFileParser({
  s3,
});

export const importProductsFile = handlers.importProductsFile();
