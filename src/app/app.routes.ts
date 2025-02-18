import { Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CatalogComponent } from './components/catalog/catalog.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/catalogo',
    pathMatch: 'full',
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'catalogo',
    component: CatalogComponent,
  },
];
