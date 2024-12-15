import { Routes } from "@angular/router";
import { HomeComponent } from "./shared/features/home/home.component";
import { CONTACT_ROUTES } from "./contact/contact.routes";

export const APP_ROUTES: Routes = [
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "products",
    loadChildren: () =>
      import("./products/products.routes").then((m) => m.PRODUCTS_ROUTES)
  },
  {
    path: 'shop',
    loadChildren: () => import('./shop/shop.routes').then(m => m.shopRoutes),
  },  
  { path: 'contact', children: CONTACT_ROUTES },
  { path: "", redirectTo: "home", pathMatch: "full" },
];
