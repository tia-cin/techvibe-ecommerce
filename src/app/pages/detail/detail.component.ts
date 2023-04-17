import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { SanityService } from "src/app/services/sanity.service";
import { Product } from "src/app/types";
import { ActivatedRoute } from "@angular/router";
import { PurchaseService } from "src/app/services/purchase.service";
import { HttpClient } from "@angular/common/http";
import { loadStripe } from "@stripe/stripe-js";

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
    private router: ActivatedRoute,
    private cartService: PurchaseService,
    private client: HttpClient
  ) {}

  ngOnInit(): void {
    this.getCurrentPath();
  }

  getCurrentPath(): void {
    this.router.url.subscribe((slug) => {
      this.slug = slug[1].path;
      this.getProduct(this.slug);
      this.getSimilarProducts();
    });
  }

  getProduct(slug: string): void {
    this.productSubcription = this.sanityService
      .getProduct(slug)
      .subscribe((product) => {
        this.product = product;
      });
  }

  getSimilarProducts(): void {
    this.recProductsSub = this.sanityService
      .getProducts("6", this.product?.category)
      .subscribe((_products) => {
        this.recProducts = _products;
      });
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      id: product._id,
      image: product.image,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  }

  onCheckout(): void {
    this.client
      .post("http://localhost:4201/checkout", {
        items: [
          {
            image: this.product?.image,
            name: this.product?.name,
            price: this.product?.price,
            quantity: 1,
            id: this.product?._id,
          },
        ],
      })
      .subscribe(async (res: any) => {
        let stripe = await loadStripe(
          "pk_test_51LqFYzENi5vsUdl1S6DlnTj64Jppk67ktJiaASMWUwXgYyEGgZxtHtcdvDINlnNK537BxkTeoacuedDo8Hjpe8X600jUwt0g3d"
        );
        stripe?.redirectToCheckout({
          sessionId: res.id,
        });
      });
  }
}
