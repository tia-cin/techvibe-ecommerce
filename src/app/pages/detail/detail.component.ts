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
      .subscribe((res) => {
        this.product = res;
        console.log(this.product);
      });
  }
}
