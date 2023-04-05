import { Injectable } from "@angular/core";
import { Product } from "../types";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SanityService {
  data: any[] = [];
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
    sort = "desc",
    category?: string
  ): Observable<Product[]> {
    if (this.data.length > 0) {
      const filteredData = this.data
        .slice(0, Number(limit))
        .sort(() => (sort === "desc" ? 1 : -1))
        .filter((p) => (category ? p.category === category : true));
      console.log(filteredData);
      return of(filteredData);
    } else {
      const productQuery = "*[_type == 'product']";
      let res: Product[] = [];

      this.sanityClientCredentials
        .fetch<Product[]>(productQuery)
        .then((data) => {
          this.data = data;
          const filteredData = data
            .slice(0, Number(limit))
            .sort(() => (sort === "desc" ? 1 : -1))
            .filter((p) => (category ? p.category === category : true));
          console.log(filteredData);
          res = filteredData;
        });
      return of(res);
    }
  }

  getCategories(): string[] {
    return this.data[0].map((p: Product) => p.category);
  }
}
