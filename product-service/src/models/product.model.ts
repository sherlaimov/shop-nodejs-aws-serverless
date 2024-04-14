export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
}

export interface ProductDto extends Omit<Product, 'id'> {
  count: number;
}

export interface InMemoryProduct extends Product {
  logo: string;
  count: number;
}
