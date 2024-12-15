import { Component, OnInit } from '@angular/core';
import { CartService } from '../../data-access/cart.service';
import { Product } from '../../data-access/product.model';
import { ShopService } from '../../data-access/shop.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-shop-list',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './shop-list.component.html',
    styleUrls: ['./shop-list.component.scss']
  })
export class ShopListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  cartCount = 0;
  searchText: string = '';
  selectedCategory: string = '';
  categories: string[] = ['Fitness', 'Electronics', 'Clothing', 'Accessories'];

  currentPage: number = 1;
  productsPerPage: number = 10;

  constructor(private shopService: ShopService, private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.shopService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
    });
    this.cartService.cart$.subscribe(cart => (this.cartCount = cart.length));
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearchText = product.name.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesCategory = this.selectedCategory ? product.category === this.selectedCategory : true;
      return matchesSearchText && matchesCategory;
    });

    this.currentPage = 1;
  }

  paginate(products: Product[]): Product[] {
    const startIndex = (this.currentPage - 1) * this.productsPerPage;
    return products.slice(startIndex, startIndex + this.productsPerPage);
  }

  changePage(page: number): void {
    if (page > 0 && page <= Math.ceil(this.filteredProducts.length / this.productsPerPage)) {
      this.currentPage = page;
    }
  }

  navigateToCart() {
    this.router.navigate(['/shop/cart']);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
