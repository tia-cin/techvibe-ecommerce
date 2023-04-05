import { Injectable } from "@angular/core";
import { Product } from "../types";
import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SanityService {
  data: any[] = [];
  constructor() {}

  sanityClientCredentials = {
    option: sanityClient({
      projectId: "wrbpjeis",
      dataset: "production",
      useCdn: true,
      token: process.env["TOKEN"],
    }),
  };

  urlFor = (source: any) =>
    imageUrlBuilder(this.sanityClientCredentials.option).image(source);

  async ngOnInit() {
    const productQuery = "*[_type == 'product']";
    const bannerQuery = "*[_type == 'banner']";

    const data1 = await this.sanityClientCredentials.option.fetch(productQuery);
    const data2 = await this.sanityClientCredentials.option.fetch(bannerQuery);

    this.data = [data1, data2];
    return this.data;
  }

  getProducts(
    limit = "12",
    sort = "desc",
    category?: string
  ): Observable<Product[]> {
    const products = this.data
      .slice(Number(limit))
      .sort(() => (sort === "desc" ? 1 : -1))
      .filter((p) => (category ? p.category === category : p));

    return of(products);
  }

  getCategories(): string[] {
    return this.data[0].map((p: Product) => p.category);
  }
}
