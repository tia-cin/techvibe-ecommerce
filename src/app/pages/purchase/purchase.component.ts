import { HttpClient } from "@angular/common/http";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { PurchaseService } from "src/app/services/purchase.service";
import { Cart, CartItem } from "src/app/types";
import { Subscription } from "rxjs";
import { loadStripe } from "@stripe/stripe-js";

@Component({
  selector: "app-purchase",
  templateUrl: "./purchase.component.html",
})
export class PurchaseComponent implements OnInit, OnDestroy {
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
    private client: HttpClient
  ) {}

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

  onRemoveQuantity(item: CartItem): void {
    this.purchaseService.removeQuantity(item);
  }

  onAddQuantity(item: CartItem): void {
    this.purchaseService.addToCart(item);
  }

  onCheckout(): void {
    this.client
      .post("http://localhost:4201/checkout", { items: this.cart.items })
      .subscribe(async (res: any) => {
        let stripe = await loadStripe(
          "pk_test_51LqFYzENi5vsUdl1S6DlnTj64Jppk67ktJiaASMWUwXgYyEGgZxtHtcdvDINlnNK537BxkTeoacuedDo8Hjpe8X600jUwt0g3d"
        );
        stripe?.redirectToCheckout({
          sessionId: res.id,
        });
      });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
