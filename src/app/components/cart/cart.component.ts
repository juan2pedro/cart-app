import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnChanges {
  @Input() items: CartItem[] = [];
  total = 0;
  @Output() idProductEventEmitter = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    this.calculateTotal();
    this.saveSessions();
  }
  onDeleteCart(idProduct: number) {
    this.idProductEventEmitter.emit(idProduct);
  }
  calculateTotal(): void {
    this.total = this.items.reduce(
      (accumulator, item) => accumulator + item.quantity * item.product.price,
      0
    );
  }
  saveSessions(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
    sessionStorage.setItem('total', this.total.toString());
  }
}
