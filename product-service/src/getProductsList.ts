import { type APIGatewayProxyEvent, type Context } from 'aws-lambda';

import { ProductServiceInterface } from './services/products';
import { winstonLogger } from './utils/winstonLogger';
import { errorResponse, successResponse } from './utils/apiResponseBuilder';

export const getProductsListHandler =
  (productService: ProductServiceInterface) =>
  async (event: APIGatewayProxyEvent, _context: Context) => {
    try {
      winstonLogger.logRequest(`Incoming event: ${JSON.stringify(event)}`);

      const products = await productService.getAllProducts();

      winstonLogger.logRequest(
        `"Received products: ${JSON.stringify(products)}`
      );

      return successResponse(products);
    } catch (err) {
      return errorResponse(err);
    }
  };
