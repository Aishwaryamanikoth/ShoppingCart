import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../product.service';

@Component({
  // selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  selectedItems: any[] = [];
  nameFilter: string = '';
  colorFilter: string = '';
  priceFilter: string = '';

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe((data: any[]) => {
      this.products = data;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter(product => {
      const nameMatch = product.name.toLowerCase().includes(this.nameFilter.toLowerCase());
      const colorMatch = product.color.toLowerCase().includes(this.colorFilter.toLowerCase());
      const priceMatch = this.priceFilter ? product.price <= this.priceFilter : true;
      return nameMatch && colorMatch && priceMatch ;
    });
  }

  addToCart(product: any): void {
    this.selectedItems.push(product);
  }



  goToCheckout(): void {
    console.log(this.selectedItems);
    this.router.navigate(['/checkout'], { state: { selectedItems: this.selectedItems } });

  }
}
