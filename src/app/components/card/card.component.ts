import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Product } from "src/app/types";
import { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
})
export class CardComponent implements OnInit {
  @Input() fullWidth = false;
  @Input() product: Product | undefined;

  @Output() urlFor = new EventEmitter();
  @Output() addToCart = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }

  onUrlFor(source: SanityImageSource): void {
    this.urlFor.emit(source);
  }
}
