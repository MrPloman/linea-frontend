// core/application/facades/cart.facade.ts
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';

import { Address, initialState, Shipping } from '.';
import { CheckoutActions } from './checkout.actions';
import { selectAddress, selectShippingMethod } from './checkout.selector';

@Injectable({ providedIn: 'root' })
export class CheckoutFacade {
  private store = inject(Store);
  public address = toSignal(this.store.select(selectAddress), {
    initialValue: initialState.checkout.address,
  });
  public shippingMethod = toSignal(this.store.select(selectShippingMethod), {
    initialValue: initialState.checkout.shippingMethod,
  });
  public updateAddress(address: Address) {
    this.store.dispatch(CheckoutActions.setAddress({ address }));
  }
  public updateShippingMethod(shipping: Shipping) {
    this.store.dispatch(CheckoutActions.setMethod({ shipping }));
  }
  public clearCheckout() {
    this.store.dispatch(CheckoutActions.clear());
  }
}
