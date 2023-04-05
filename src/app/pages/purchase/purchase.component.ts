import { HttpClient } from "@angular/common/http";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { PurchaseService } from "src/app/services/purchase.service";
import { Cart, CartItem } from "src/app/types";
import { Subscription } from "rxjs";

@Component({
  selector: "app-purchase",
  templateUrl: "./purchase.component.html",
})
export class PurchaseComponent implements OnInit {
  cart: Cart = {
    items: [
      {
        image: "https://via.placeholder.com/150",
        name: "product test",
        price: 120,
        id: 1,
        quantity: 2,
      },
      {
        image: "https://via.placeholder.com/150",
        name: "product test",
        price: 100,
        id: 2,
        quantity: 2,
      },
    ],
  };
  dataSource: CartItem[] = [];
  cartSubscription: undefined | Subscription;
  currCols: string[] = [
    "product",
    "name",
    "price",
    "quantity",
    "total",
    "action",
  ];
  constructor(private purchaseService: PurchaseService) {}

  ngOnInit(): void {
    this.purchaseService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }

  getTotal(items: CartItem[]): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, curr) => prev + curr, 0);
  }

  onEmptyCart(): void {
    this.purchaseService.emptyCart();
  }

  onRemoveFromCart(item: CartItem): void {
    this.purchaseService.removeFromCart(item);
  }
}
