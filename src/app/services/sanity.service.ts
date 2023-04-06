import { Injectable } from "@angular/core";
import { Product, Banner } from "../types";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { Observable, of, from } from "rxjs";
import { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

@Injectable({
  providedIn: "root",
})
export class SanityService {
  banners: Banner[] = [];
  products: Product[] | undefined;
  constructor() {}

  sanityClientCredentials = createClient({
    projectId: "wrbpjeis",
    useCdn: true,
    apiVersion: "2021-08-31",
    dataset: "production",
    token:
      "skH0AykEpycLIiwx0hlRTxnGsxJd7CZAQP6dcJTufja5ltlEwsukV6VMCX6U7DU6JF2ewUuvVJLffWnWL5PLRECXk0Oc88sXAGsFzBxaTXQmR27ZPPWGjfXN7aw02ZTiKF1pKTLuh2S7rs12sfFLMYdU7hZRjxcwC0Q76YuS9WFjK1tGmz2A",
  });

  urlFor(source: SanityImageSource): ImageUrlBuilder {
    return imageUrlBuilder(this.sanityClientCredentials).image(source);
  }

  getBanners() {
    const bannerQuery = "*[_type == 'banner']";
    const fetchBanners = this.sanityClientCredentials.fetch(bannerQuery);
  }

  filteredData(
    data: Product[],
    limit: number,
    sort: string,
    category?: string
  ) {
    return data
      .slice(0, limit)
      .sort(() => (sort === "A - Z" ? 1 : -1))
      .filter((p) => (category ? p.category === category : true));
  }

  updateImageProp(product: Product): Product {
    const { image, ...pro } = product;
    const updated = String(this.urlFor(image && image[0]));
    return { ...pro, image: updated };
  }

  getProducts(
    limit = "12",
    sort = "A - Z",
    category?: string
  ): Observable<Product[]> {
    if (this.products) {
      const allProducts = this.products.map((p) =>
        this.urlFor(p.image && p.image[0])
      );
      console.log(allProducts);

      const filteredData = this.filteredData(
        this.products,
        Number(limit),
        sort,
        category
      );
      return of(filteredData);
    } else {
      const productQuery = "*[_type == 'product']";

      return from(
        this.sanityClientCredentials
          .fetch<Product[]>(productQuery)
          .then((data) => {
            this.products = data.map((d) => this.updateImageProp(d));

            const filteredData = this.filteredData(
              data,
              Number(limit),
              sort,
              category
            );
            console.log(filteredData);

            return filteredData;
          })
      );
    }
  }

  // getCategories(): string[] {
  //   return this.products?.map((p: Product) => p.category);
  // }
}
