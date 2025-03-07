import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from './navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';
import Swal from 'sweetalert2';
import { ItemsState } from '../store/items.reducer';
import { Store } from '@ngrx/store';
import { add, remove, total } from '../store/items.actions';
@Component({
  selector: 'cart-app',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html',
})
export class CartAppComponent implements OnInit {
  items: CartItem[] = [];

  constructor(
    private sharingDataService: SharingDataService,
    private rotuter: Router,
    private store: Store<{ items: ItemsState }>
  ) {
    this.store.select('items').subscribe((state) => {
      this.items = state.items;
    });
  }

  ngOnInit(): void {
    // this.store.dispatch(total());
    this.onDeleteCart();
    this.onAddCart();
  }
  onAddCart(): void {
    this.sharingDataService.productEventEmitter.subscribe((product) => {
      this.store.dispatch(add({ product }));
      this.store.dispatch(total());
      this.saveSessions();
      this.rotuter.navigate(['/cart']);
      Swal.fire({
        title: 'Carrito de compra',
        text: 'Producto añadido al carrito',
        icon: 'success',
      });
    });
  }

  onDeleteCart(): void {
    this.sharingDataService.idProductEventEmitter.subscribe((id) => {
      Swal.fire({
        title: '¿Está seguro de eliminar el producto?',
        text: 'Cuidado el item se iliminara del carrito!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch(remove({ id }));
          this.store.dispatch(total());
          this.saveSessions();
          this.rotuter.navigate(['/cart']);
          Swal.fire({
            title: 'Elimidado!',
            text: 'Item eliminado del carrito de compra.',
            icon: 'success',
          });
        }
      });
    });
  }
  saveSessions(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }
}
