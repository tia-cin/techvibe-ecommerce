import { Component, OnInit } from "@angular/core";
import { Cart } from "./types";
import { PurchaseService } from "./services/purchase.service";

@Component({
  selector: "app-root",
  template: `<app-header [cart]="cart"></app-header>
    <router-outlet></router-outlet> <app-footer></app-footer>`,
  styles: [],
})
export class AppComponent implements OnInit {
  cart: Cart = { items: [] };

  constructor(private cartService: PurchaseService) {}

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
    });
  }
}
