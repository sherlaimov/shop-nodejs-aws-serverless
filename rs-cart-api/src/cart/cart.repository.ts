import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CartStatus } from './models';

@Injectable()
export class CartRepository extends Repository<Cart> {
  constructor(private dataSource: DataSource) {
    super(Cart, dataSource.createEntityManager());
  }

  async findCartByUserId(id: string) {
    const found = await this.findOne({
      where: { user_id: id },
    });

    if (!found) {
      throw new NotFoundException(`Cart from user with id: ${id} not found`);
    }
    return found;
  }

  async createCartByUserId(userId: string) {
    const newCart = this.create({
      user_id: userId,
      status: CartStatus.OPEN,
    });

    await this.save(newCart);

    return newCart;
  }

  findOrCreateByUserId(userId: string) {
    const userCart = this.findCartByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createCartByUserId(userId);
  }

  async updateByUserId(userId: string, { items: newItems }: Cart) {
    const { id, items, ...rest } = await this.findOrCreateByUserId(userId);

    const updatedCart: Cart = {
      id,
      ...rest,
      items: [...items, ...newItems],
    };

    const result = await this.save(updatedCart);

    return result;
  }

  removeByUserId(id: string) {
    return this.delete(id);
  }
}
