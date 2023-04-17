import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { SanityService } from "src/app/services/sanity.service";
import { Product } from "src/app/types";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
})
export class DetailComponent implements OnInit {
  recProducts: Product[] | undefined;
  recProductsSub: Subscription | undefined;
  product: Product | undefined;
  productSubcription: Subscription | undefined;
  slug: string | undefined;

  constructor(
    private sanityService: SanityService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCurrentPath();
    if (this.slug) {
      this.getProduct(this.slug);
      this.getProducts();
    }
  }

  getCurrentPath(): void {
    this.router.url.subscribe((segments) => {
      this.slug = segments[1].path;
    });
  }

  getProduct(slug: string): void {
    this.productSubcription = this.sanityService
      .getProduct(slug)
      .subscribe((product) => {
        this.product = product;
      });
  }

  getProducts(): void {
    this.recProductsSub = this.sanityService
      .getProducts("6", "A - Z", this.product?.category)
      .subscribe((_products) => {
        this.recProducts = _products;
        console.log(this.recProducts);
      });
  }
}
