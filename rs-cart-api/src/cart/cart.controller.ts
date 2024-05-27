import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';

import { OrderService } from '../order';
import { AppRequest, getUserIdFromRequest } from '../shared';

import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';

@Controller('api/profile/cart')
export class CartController {
  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  @Get('/:userId')
  async findUserCart(@Param('userId') userId: string) {
    const cart = await this.cartService.findOrCreateByUserId(userId);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { cart },
    };
  }

  @Put('/:userId')
  async updateUserCart(@Param('userId') userId: string, @Body() body: Cart) {
    const cart = await this.cartService.updateByUserId(userId, body);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        cart,
      },
    };
  }

  @Delete('/:userId')
  async clearUserCart(@Req() req: AppRequest) {
    await this.cartService.removeByUserId(getUserIdFromRequest(req));

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    };
  }

  @Post('checkout')
  async checkout(@Req() req: AppRequest, @Body() body) {
    const userId = getUserIdFromRequest(req);
    const cart = await this.cartService.findByUserId(userId);

    if (!(cart && cart.items.length)) {
      const statusCode = HttpStatus.BAD_REQUEST;
      req.statusCode = statusCode;

      return {
        statusCode,
        message: 'Cart is empty',
      };
    }

    const { id: cartId, items } = cart;
    const order = this.orderService.create({
      // TODO: validate and pick only necessary data
      ...body,
      userId,
      cartId,
      items,
    });

    await this.cartService.removeByUserId(userId);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { order },
    };
  }
}
