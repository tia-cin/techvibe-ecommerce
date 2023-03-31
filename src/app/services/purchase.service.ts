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

  removeFromCart(item: CartItem, updateCart: boolean = true): CartItem[] {
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id === item.id
    );

    if (updateCart) {
      this.cart.next({ items: filteredItems });
      this._snackBar.open("1 item removed from cart!", "OK", {
        duration: 3000,
      });
    }

    return filteredItems;
  }

  removeQuantity(item: CartItem): void {
    let itemToRemove!: CartItem;
    let filteredItems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;
        if (_item.quantity === 0) {
          itemToRemove = _item;
        }
      }
      return _item;
    });

    if (itemToRemove) {
      filteredItems = this.removeFromCart(itemToRemove, false);
    }

    this.cart.next({ items: filteredItems });
    this._snackBar.open("1 item removed from cart!", "OK", { duration: 3000 });
  }

  emptyCart(): void {
    this.cart.next({ items: [] });
    this._snackBar.open("Cart is Empty!", "OK", { duration: 3000 });
  }

  getTotal(items: CartItem[]): number {
    return items
      .map((item: CartItem) => item.price * item.quantity)
      .reduce((prev, curr): number => prev + curr, 0);
  }
}
