import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../Services/Products/products.service';
import { Product, ProductsResponse } from '../../Interfaces/product';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../Componentes/navbar/navbar.component';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent {
  productsService = inject(ProductsService);
  router = inject(Router);

  response: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
  totalValue: number = 0;
  isModalOpen: boolean = false;
  cart: { product: Product, quantity: number }[] = [];

  ngOnInit() {
    this.showProducts();
  }

  showProducts() {
    this.isLoading = true;
    this.productsService.showProducts().subscribe({
      next: (data: ProductsResponse) => {
        this.response = data.products;
        this.filteredProducts = this.response;
        this.extractCategories();
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'An error occurred while fetching products.';
        this.isLoading = false;
      }
    });
  }

  extractCategories() {
    const allCategories = this.response.map(product => product.category);
    this.categories = Array.from(new Set(allCategories));
  }

  filterByCategory(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCategory = selectElement.value;
    if (this.selectedCategory) {
      this.filteredProducts = this.response.filter(product => product.category === this.selectedCategory);
    } else {
      this.filteredProducts = this.response;
    }
  }

  addToCart(product: Product) {
    const existingItem = this.cart.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ product, quantity: 1 });
    }
    this.calculateTotalValue();
  }

  buyNow(product: Product) {
    this.cart = [{ product, quantity: 1 }];
    this.calculateTotalValue();
    this.openCheckoutModal();
  }

  openCheckoutModal() {
    this.isModalOpen = true;
  }

  closeCheckoutModal() {
    this.isModalOpen = false;
  }

  processPayment(event: Event) {
    event.preventDefault();
    // Display the total value in the alert or process payment here
    alert(`Payment processed! Total Cost: ${this.totalValue}`);
    this.closeCheckoutModal();
  }

  calculateTotalValue() {
    this.totalValue = this.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }
}
