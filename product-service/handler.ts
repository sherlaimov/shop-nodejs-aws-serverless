import * as handlers from './src';
import { InMemoryProductService } from './src/services/in-memory-product-service';

const inMemoryProductService = new InMemoryProductService();

export const getProductById = handlers.getProductByIdHandler(
  inMemoryProductService
);

export const getProductsList = handlers.getProductsListHandler(
  inMemoryProductService
);
