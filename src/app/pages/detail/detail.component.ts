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
    this.router.url.subscribe((segments) => {
      this.slug = segments[1].path;
    });
  }

  getProduct(slug: string): void {}
}
