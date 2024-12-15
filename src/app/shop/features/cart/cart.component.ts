import { Component, OnInit } from '@angular/core';
import { CartService } from '../../data-access/cart.service';
import { Product } from '../../data-access/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: Product[] = [];
  constructor(private cartService: CartService) {}
  ngOnInit() {
    this.cartService.cart$.subscribe(cart => (this.cart = cart));
  }
  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
  }
  clearCart() {
    this.cartService.clearCart();
  }
  increaseQuantity(productId: number) {
    this.cartService.increaseQuantity(productId);
  }
  decreaseQuantity(productId: number) {
    this.cartService.decreaseQuantity(productId);
  }
  get totalPrice(): number {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
