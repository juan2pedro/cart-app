import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'modal',
  standalone: true,
  imports: [CartComponent],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  @Input() items: CartItem[] = [];
  //@Input() total = 0;
  @Output() idProductEventEmitter = new EventEmitter();
  @Output() OpenEventEmitter = new EventEmitter();

  onDeleteCart(idProduct: number) {
    this.idProductEventEmitter.emit(idProduct);
  }

  openCart(): void {
    this.OpenEventEmitter.emit();
  }
}
