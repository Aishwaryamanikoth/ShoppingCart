
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemListComponent } from './components/item-list/item-list.component';
import { CheckoutListComponent } from './components/checkout-list/checkout-list.component';

const routes: Routes = [
  { path: '', component: ItemListComponent },
  { path: 'checkout', component: CheckoutListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
