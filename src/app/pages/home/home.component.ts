import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { PurchaseService } from "src/app/services/purchase.service";
import { SanityService } from "src/app/services/sanity.service";
import { Banner, Product } from "src/app/types";

const ROW_HEIGHT: { [id: number]: number } = { 1: 400, 3: 355, 4: 380 };

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit, OnDestroy {
  cols: number = 3;
  rowHeight: number = ROW_HEIGHT[this.cols];
  category: string | undefined;
  products: Product[] | undefined;
  banners: Banner[] | undefined;
  sort = "A - Z";
  count = "6";
  productsSubcription: Subscription | undefined;

  constructor(
    private cartService: PurchaseService,
    private sanityService: SanityService
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.getBanners();
  }

  getProducts(): void {
    this.productsSubcription = this.sanityService
      .getProducts(this.count, this.sort, this.category)
      .subscribe((_products) => {
        this.products = _products;
      });
  }

  async getBanners() {
    this.banners = await this.sanityService.getBanners();
  }

  colsChange(cols: number): void {
    this.cols = cols;
    this.rowHeight = ROW_HEIGHT[cols];
  }

  currentCategory(categ: string): void {
    this.category = categ;
    this.getProducts();
  }

  currentSort(sort: string): void {
    this.sort = sort;
    this.getProducts();
  }

  currentCount(count: number): void {
    this.count = count.toString();
    this.getProducts();
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

  ngOnDestroy(): void {
    if (this.productsSubcription) {
      this.productsSubcription.unsubscribe();
    }
  }
}
