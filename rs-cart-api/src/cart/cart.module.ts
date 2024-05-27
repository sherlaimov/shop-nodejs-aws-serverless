import { Module } from '@nestjs/common';

import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartRepository } from './cart.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';

@Module({
  imports: [OrderModule, TypeOrmModule.forFeature([Cart, CartItem])],
  providers: [CartService, CartRepository],
  controllers: [CartController],
})
export class CartModule {}
