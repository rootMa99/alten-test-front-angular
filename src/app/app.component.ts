import { Component, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { SplitterModule } from 'primeng/splitter';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelMenuComponent } from "./shared/ui/panel-menu/panel-menu.component";
import { CartService } from './shop/data-access/cart.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [RouterModule, SplitterModule, ToolbarModule, PanelMenuComponent],
})
export class AppComponent implements OnInit {
  title = "ALTEN SHOP";
  cartCount = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartCount = this.cartService.cartCount;
    this.cartService.cart$.subscribe(() => {
      this.cartCount = this.cartService.cartCount;
    });
  }
  navigateToCart() {
    this.router.navigate(['/shop/cart']);
  }
}
