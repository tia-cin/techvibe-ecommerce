import { Injectable } from "@angular/core";
import { Product, Banner } from "../types";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SanityService {
  banners: Banner[] = [];
  products: Product[] = [];
  constructor() {}

  sanityClientCredentials = createClient({
    projectId: "wrbpjeis",
    useCdn: true,
    apiVersion: "2021-08-31",
    dataset: "production",
    token:
      "skH0AykEpycLIiwx0hlRTxnGsxJd7CZAQP6dcJTufja5ltlEwsukV6VMCX6U7DU6JF2ewUuvVJLffWnWL5PLRECXk0Oc88sXAGsFzBxaTXQmR27ZPPWGjfXN7aw02ZTiKF1pKTLuh2S7rs12sfFLMYdU7hZRjxcwC0Q76YuS9WFjK1tGmz2A",
  });

  urlFor = (source: any) =>
    imageUrlBuilder(this.sanityClientCredentials).image(source);

  getBanners() {
    const bannerQuery = "*[_type == 'banner']";
    const fetchBanners = this.sanityClientCredentials.fetch(bannerQuery);
  }

  getProducts(
    limit = "12",
    sort = "A - Z",
    category?: string
  ): Observable<Product[]> {
    if (this.products.length > 0) {
      const filteredData = this.products
        .slice(0, Number(limit))
        .sort(() => (sort === "A - Z" ? 1 : -1))
        .filter((p) => (category ? p.category === category : true));
      return of(filteredData);
    } else {
      const productQuery = "*[_type == 'product']";

      this.sanityClientCredentials
        .fetch<Product[]>(productQuery)
        .then((data) => {
          this.products = data;
          const filteredData = data
            .slice(0, Number(limit))
            .sort(() => (sort === "A - Z" ? 1 : -1))
            .filter((p) => (category ? p.category === category : true));
          this.products = filteredData;
        });
      console.log(this.products);
      return of(this.products);
    }
  }

  getCategories(): string[] {
    return this.products.map((p: Product) => p.category);
  }
}
