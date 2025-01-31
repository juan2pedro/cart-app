import { Component, Input } from '@angular/core';
import { products } from '../../data/product.data';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'catalog',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html',
})
export class CatalogComponent {
  @Input() products!: Product[];
}
