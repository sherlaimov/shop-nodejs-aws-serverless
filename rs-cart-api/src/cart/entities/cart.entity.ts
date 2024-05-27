import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CartStatus } from '../models';
import { CartItem } from './cart-item.entity';

/* 
    id - uuid (Primary key)
    user_id - uuid, not null (It's not Foreign key, because there is no user entity in DB)
    created_at - date, not null
    updated_at - date, not null
    status - enum ("OPEN", "ORDERED") 

*/

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  @Column()
  status: CartStatus;

  @JoinTable()
  @OneToMany(() => CartItem, (item) => item.cart, { cascade: true })
  items: CartItem[];
}
