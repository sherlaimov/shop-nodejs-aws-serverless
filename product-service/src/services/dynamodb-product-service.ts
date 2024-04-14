import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  ScanCommand,
  QueryCommand,
  PutCommand,
} from '@aws-sdk/lib-dynamodb';

import { Product, ProductDto, Stock } from '../models';
import { ProductServiceInterface } from './products';
import { v4 as uuidv4 } from 'uuid';

class DynamoDBProductService implements ProductServiceInterface {
  private dbClient: DynamoDBDocumentClient;

  constructor(private dynamoClient = new DynamoDBClient()) {
    this.dbClient = DynamoDBDocumentClient.from(this.dynamoClient);
  }

  private async getItems<T>(command: ScanCommand) {
    const { Items } = await this.dbClient.send(command);
    return (Items ?? []) as T[];
  }

  private async getItem<T>(command: QueryCommand) {
    const items = (await this.dbClient.send(command)).Items;

    return items?.[0] as T;
  }

  async getProductById(id: string) {
    const commandProducts = new QueryCommand({
      TableName: 'Products',
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: { ':id': id },
    });

    const commandStocks = new QueryCommand({
      TableName: 'Stock',
      KeyConditionExpression: 'product_id = :id',
      ExpressionAttributeValues: { ':id': id },
    });

    const product = await this.getItem<Product>(commandProducts);
    const stock = await this.getItem<Stock>(commandStocks);

    if (!product || !stock) {
      return null;
    }

    return { ...product, count: stock.count };
  }

  async getAllProducts() {
    const productsCommand = new ScanCommand({
      TableName: 'Products',
    });
    const stocksCommand = new ScanCommand({
      TableName: 'Stock',
    });

    const products = await this.getItems<Product>(productsCommand);
    const stocks = await this.getItems<Stock>(stocksCommand);

    return this.mapProductsWithStock(products, stocks);
  }

  private mapProductsWithStock(
    products: Product[],
    stocks: Stock[]
  ): Product[] {
    return products.map((product) => ({
      ...product,
      count:
        stocks.find(({ product_id }) => product.id === product_id)?.count ?? 0,
    }));
  }

  async create(payload: ProductDto) {
    const { count, description, price, title } = payload;
    const id = uuidv4();
    const product: Product = { id, description, price, title };
    const stock: Stock = { product_id: id, count };

    const commandProduct = new PutCommand({
      TableName: 'Products',
      Item: product,
    });

    const commandStock = new PutCommand({
      TableName: 'Stock',
      Item: stock,
    });

    await this.dbClient.send(commandProduct);
    await this.dbClient.send(commandStock);

    return { ...product, count };
  }
}

export const dynamoDBProductService = new DynamoDBProductService();
