import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Product } from "src/app/types";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
})
export class CardComponent implements OnInit {
  @Input() fullWidth = false;
  @Output() addToCart = new EventEmitter();

  product: Product | undefined = {
    id: 1,
    name: "product name",
    price: 100,
    category: "smartphone",
    details: "Et voluptate in duis nostrud quis officia anim nisi sit.",
    image: "https://via.placeholder.com/150",
    slug: "product-name",
  };

  constructor() {}

  ngOnInit(): void {}

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
