import { type APIGatewayProxyEvent, type Context } from 'aws-lambda';

import { ProductServiceInterface } from './services/products';
import { winstonLogger } from './utils/winstonLogger';
import { errorResponse, successResponse } from './utils/apiResponseBuilder';

export const getProductByIdHandler =
  (productService: ProductServiceInterface) =>
  async (event: APIGatewayProxyEvent, _context: Context) => {
    try {
      winstonLogger.logRequest(`Incoming event: ${JSON.stringify(event)}`);

      const { productId = '' } = event.pathParameters;

      const product = await productService.getProductById(productId);

      winstonLogger.logRequest(
        `"Received product with id: ${productId}: ${JSON.stringify(product)}`
      );

      if (product) return successResponse({ product });

      return successResponse({ message: 'Product not found' }, 404);
    } catch (err) {
      return errorResponse(err);
    }
  };
