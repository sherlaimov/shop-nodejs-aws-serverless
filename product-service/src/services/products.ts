import { Product } from '../models';

export interface ProductServiceInterface {
  getProductById: (id: string) => Promise<Product>;
  getAllProducts: () => Promise<Product[]>;
  create: (product: Omit<Product, 'id'>) => Promise<Product>;
}
