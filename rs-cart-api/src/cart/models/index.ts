export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
};

export type CartItem = {
  product: Product;
  count: number;
};

export type Cart = {
  id: string;
  user_id: string;
  items: CartItem[];
  created_at: Date;
  updated_at: Date;
  status: CartStatus;
};

export enum CartStatus {
  OPEN = 'OPEN',
  ORDERED = 'ORDERED',
}
