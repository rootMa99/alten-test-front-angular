import { Routes } from '@angular/router';
import { ShopListComponent } from './features/shop-list/shop-list.component';
import { CartComponent } from './features/cart/cart.component';

export const shopRoutes: Routes = [
  { path: 'list', component: ShopListComponent },
  { path: 'cart', component: CartComponent },
	{ path: "**", redirectTo: "list" },
];
