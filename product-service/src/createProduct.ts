import { type APIGatewayProxyEvent, type Context } from 'aws-lambda';

import { ProductServiceInterface } from './services/products';
import { winstonLogger } from './utils/winstonLogger';
import { errorResponse, successResponse } from './utils/apiResponseBuilder';
import { ProductDto } from './models';

export const createProductHandler =
  (productService: ProductServiceInterface) =>
  async (event: APIGatewayProxyEvent, _context: Context) => {
    try {
      winstonLogger.logRequest(`Incoming event: ${JSON.stringify(event)}`);

      const payload = JSON.parse(event.body) as ProductDto;

      const product = await productService.create(payload);

      winstonLogger.logRequest(`Created product: ${JSON.stringify(product)}`);

      return successResponse(product);
    } catch (err) {
      return errorResponse(err);
    }
  };
