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
  cart: Cart = { items: [] };
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
  constructor(
    private purchaseService: PurchaseService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.cartSubscription = this.purchaseService.cart.subscribe(
      (_cart: Cart) => {
        this.cart = _cart;
        this.dataSource = _cart.items;
      }
    );
  }
}
