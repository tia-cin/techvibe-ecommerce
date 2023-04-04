import { Component, Input, OnInit } from "@angular/core";
import { Cart } from "src/app/types";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent {
  @Input()
  get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;

    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, curr) => prev + curr, 0);
  }

  private _cart: Cart = { items: [] };
  itemsQuantity = 0;

  constructor() {}
}
