import * as handlers from './src';
import { dynamoDBProductService } from './src/services/dynamodb-product-service';

export const getProductById = handlers.getProductByIdHandler(
  dynamoDBProductService
);

export const getProductsList = handlers.getProductsListHandler(
  dynamoDBProductService
);

export const createProduct = handlers.createProductHandler(
  dynamoDBProductService
);

export const catalogBatchProcess = handlers.catalogBatchProcessHandler;
