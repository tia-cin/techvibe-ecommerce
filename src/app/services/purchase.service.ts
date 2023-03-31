import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Cart, CartItem } from "../types";

@Injectable({
  providedIn: "root",
})
export class PurchaseService {
  cart = new BehaviorSubject<Cart>({ items: [] });

  constructor(private _snackBar: MatSnackBar) {}

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];
    const currItem = items.find((_item) => _item.id === item.id);

    if (currItem) {
      currItem.quantity += 1;
    } else {
      items.push(item);
    }

    this.cart.next({ items });
    this._snackBar.open("1 item added to cart!", "OK", { duration: 3000 });
  }
}
