import { Component } from '@angular/core';
import { products } from '../../data/product.data';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Route, Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'catalog',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html',
})
export class CatalogComponent {
  products!: Product[];

  constructor(
    private router: Router,
    private sharingDataService: SharingDataService
  ) {
    this.products =
      this.router.getCurrentNavigation()?.extras.state!['products'];
  }

  onAddCart(product: Product) {
    this.sharingDataService.productEventEmitter.emit(product);
  }
}
