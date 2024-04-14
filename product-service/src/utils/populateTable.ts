import { DynamoDB, config } from 'aws-sdk';
import { products, stocks } from '../mocks';

const dynamoDb = new DynamoDB.DocumentClient();
config.update({ region: process.env.AWS_REGION });

const populateTable = async <
  T extends DynamoDB.DocumentClient.PutItemInputAttributeMap,
>(
  tableName: string,
  items: T[]
) => {
  for (const item of items) {
    await dynamoDb
      .put({
        TableName: tableName,
        Item: item,
      })
      .promise();
  }
};

populateTable('Products', products).catch((error) => console.error(error));
populateTable('Stock', stocks).catch((error) => console.error(error));
