import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from './navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html',
})
export class CartAppComponent implements OnInit {
  items: CartItem[] = [];
  total: number = 0;

  constructor(
    private service: ProductService,
    private sharingDataService: SharingDataService,
    private rotuter: Router
  ) {}

  ngOnInit(): void {
    this.items = JSON.parse(sessionStorage.getItem('cart')!) || [];
    this.calculateTotal();
    this.onDeleteCart();
    this.onAddCart();
  }
  onAddCart(): void {
    this.sharingDataService.productEventEmitter.subscribe((product) => {
      const hasItem = this.items.find((item) => item.product.id === product.id);
      if (hasItem) {
        this.items = this.items.map((item) => {
          if (item.product.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      } else {
        this.items = [...this.items, { product: { ...product }, quantity: 1 }];
      }
      this.calculateTotal();
      this.saveSessions();
      this.rotuter.navigate(['/cart'], {
        state: { items: this.items, total: this.total },
      });
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
          this.items = this.items.filter((item) => item.product.id !== id);
          if (this.items.length == 0) {
            sessionStorage.removeItem('cart');
            sessionStorage.clear();
          }
          this.calculateTotal();
          this.saveSessions();
          this.rotuter
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.rotuter.navigate(['/cart'], {
                state: { items: this.items, total: this.total },
              });
            });
          Swal.fire({
            title: 'Elimidado!',
            text: 'Item eliminado del carrito de compra.',
            icon: 'success',
          });
        }
      });
    });
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
