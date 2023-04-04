import { Component, Input, OnInit } from "@angular/core";
import { PurchaseService } from "src/app/services/purchase.service";
import { Cart, CartItem } from "src/app/types";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
})
export class CartComponent implements OnInit {
  @Input() itemsQuantity: number = 0;
  @Input() cart: Cart = { items: [] };

  constructor(private cartService: PurchaseService) {}

  ngOnInit(): void {}

  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }

  onEmptyCart(): void {
    return this.cartService.emptyCart();
  }
}
