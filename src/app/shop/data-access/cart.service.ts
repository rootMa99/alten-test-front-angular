import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../products/data-access/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart = new BehaviorSubject<Product[]>([]); 
  cart$ = this.cart.asObservable(); 

  get cartCount() {
    return this.cart.value.reduce((count, product) => count + product.quantity, 0);
  }

  addToCart(product: Product) {
    const currentCart = this.cart.value;
    const index = currentCart.findIndex(p => p.id === product.id);

    if (index > -1) {
      currentCart[index].quantity += 1;
    } else {
      currentCart.push({ ...product, quantity: 1 });
    }

    this.cart.next(currentCart);
  }

  removeFromCart(productId: number) {
    const currentCart = this.cart.value.filter(p => p.id !== productId);
    this.cart.next(currentCart);
  }

  clearCart() {
    this.cart.next([]);
  }

  increaseQuantity(productId: number) {
    const currentCart = this.cart.value;
    const index = currentCart.findIndex(p => p.id === productId);

    if (index > -1) {
      currentCart[index].quantity += 1;
      this.cart.next(currentCart);
    }
  }

  decreaseQuantity(productId: number) {
    const currentCart = this.cart.value;
    const index = currentCart.findIndex(p => p.id === productId);

    if (index > -1 && currentCart[index].quantity > 1) {
      currentCart[index].quantity -= 1;
      this.cart.next(currentCart);
    }
  }
}
