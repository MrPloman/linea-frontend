import { InjectionToken } from '@angular/core';
import { CartRepository } from '../../domain/ports/cart.repository';

export const CART_REPOSITORY = new InjectionToken<CartRepository>('CartRepository');
