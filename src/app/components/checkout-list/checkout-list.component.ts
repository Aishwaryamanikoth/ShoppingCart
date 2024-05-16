
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'; // Import Location service


@Component({
  selector: 'app-checkout-list',
  templateUrl: './checkout-list.component.html',
  styleUrls: ['./checkout-list.component.css']
})
export class CheckoutListComponent implements OnInit {
  selectedItems: any[] = [];
  selectedItemsWithCount: any[] = [];
  totalSum: number = 0;

  constructor(private route: ActivatedRoute ,private location: Location) { }

  ngOnInit(): void {
    // Access the state passed through navigation
    const navigationState = window.history.state;
    if (navigationState && navigationState.selectedItems) {
      this.selectedItems = navigationState.selectedItems;
      this.calculateTotalSum();
      this.aggregateItemsWithCount();
    }
  }

  calculateTotalSum(): void {
    const total = this.selectedItems.reduce((total, item) => total + item.price, 0);
    this.totalSum = parseFloat(total.toFixed(3));
  }


  aggregateItemsWithCount(): void {
    const map = new Map();
    this.selectedItems.forEach(item => {
      const key = item.id;
      if (map.has(key)) {
        map.get(key).count++;
      } else {
        map.set(key, { ...item, count: 1 });
      }
    });
    this.selectedItemsWithCount = Array.from(map.values());
  }

  removeItem(index: number): void {
    this.selectedItems.splice(index, 1);
    this.calculateTotalSum();
    this.aggregateItemsWithCount();
  }

  goBack(): void {
    this.location.back();
  }

}
