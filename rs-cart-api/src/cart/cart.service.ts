import { Injectable } from '@nestjs/common';

import { CartRepository } from './cart.repository';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}

  findByUserId(userId: string): Promise<Cart> {
    return this.cartRepository.findCartByUserId(userId);
  }

  createByUserId(userId: string) {
    return this.cartRepository.createCartByUserId(userId);
  }

  findOrCreateByUserId(userId: string) {
    return this.cartRepository.findOrCreateByUserId(userId);
  }

  updateByUserId(userId: string, cart: Cart) {
    return this.cartRepository.updateByUserId(userId, cart);
  }

  removeByUserId(userId: string) {
    return this.cartRepository.removeByUserId(userId);
  }
}
