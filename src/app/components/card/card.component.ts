import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Product } from "src/app/types";
import { Router } from "@angular/router";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
})
export class CardComponent implements OnInit {
  @Input() fullWidth = false;
  @Input() product: Product | undefined;

  @Output() addToCart = new EventEmitter();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }

  onRedirect(slug: string): void {
    this.router.navigate(["/product", slug]);
  }
}
