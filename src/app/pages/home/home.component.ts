import { Component, OnInit } from "@angular/core";
import { PurchaseService } from "src/app/services/purchase.service";
import { Product } from "src/app/types";

const ROW_HEIGHT: { [id: number]: number } = { 1: 400, 3: 355, 4: 380 };

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  cols: number = 3;
  rowHeight: number = ROW_HEIGHT[this.cols];
  category: string | undefined;

  constructor(private cartService: PurchaseService) {}

  ngOnInit(): void {}

  colsChange(cols: number): void {
    this.cols = cols;
  }

  currentCategory(categ: string): void {
    this.category = categ;
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      id: product.id,
      image: product.image,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  }
}
