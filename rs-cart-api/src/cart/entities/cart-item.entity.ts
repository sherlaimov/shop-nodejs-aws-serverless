import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from './cart.entity';

/* 
  cart_items:
    cart_id - uuid (Foreign key from carts.id)
    product_id - uuid
    count - integer (Number of items in a cart)
*/

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'cart_id' })
  cart_id: string;

  @Column()
  product_id: string;

  @Column()
  count: number;

  @ManyToOne(() => Cart, (cart) => cart.items)
  cart: Cart;
}
