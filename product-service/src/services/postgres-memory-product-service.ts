import { Product } from '../models';
import { ProductServiceInterface } from './products';
import { Client, QueryConfig } from 'pg';

class PostgresProductService implements ProductServiceInterface {
  private tableName = 'products';

  constructor(private databaseClient: Client) {}

  async getProductById(id: string): Promise<Product> {
    const query = {
      text: `SELECT * FROM ${this.tableName} WHERE id = $1`,
      values: [id],
    } as QueryConfig;

    const result = await this.databaseClient.query(query);
    return result.rows[0] ? result.rows[0] : null;
  }

  async getAllProducts(): Promise<Product[]> {
    const query = {
      text: `SELECT * FROM ${this.tableName}`,
    } as QueryConfig;

    const result = await this.databaseClient.query(query);
    return result.rows ? result.rows : null;
  }

  async create(product: Pick<Product, 'title' | 'description' | 'price'>) {
    const query = {
      text: `INSERT INTO ${this.tableName}(title, description, price, logo, count) VALUES($1, $2, $3, $4, $5) RETURNING *`,
      values: [product.title, product.description, product.price],
    };
    const result = await this.databaseClient.query(query);
    return result.rows[0] ? result.rows[0] : null;
  }
}

export { PostgresProductService };
