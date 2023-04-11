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
  banners: Banner[] | undefined;
  products: Product[] | undefined;
  sanityClientCredentials = createClient({
    projectId: "wrbpjeis",
    useCdn: true,
    apiVersion: "2021-08-31",
    dataset: "production",
    token:
      "skH0AykEpycLIiwx0hlRTxnGsxJd7CZAQP6dcJTufja5ltlEwsukV6VMCX6U7DU6JF2ewUuvVJLffWnWL5PLRECXk0Oc88sXAGsFzBxaTXQmR27ZPPWGjfXN7aw02ZTiKF1pKTLuh2S7rs12sfFLMYdU7hZRjxcwC0Q76YuS9WFjK1tGmz2A",
  });
  builder = imageUrlBuilder(this.sanityClientCredentials);

  constructor() {}

  urlFor(source: SanityImageSource): ImageUrlBuilder {
    return this.builder.image(source);
  }

  async getBanners(): Promise<Banner[]> {
    if (this.banners) {
      return this.banners.map((p) => this.updateImageProp(p));
    } else {
      const bannerQuery = "*[_type == 'banner']";
      const bannerFetch = await this.sanityClientCredentials.fetch<Banner[]>(
        bannerQuery
      );
      return bannerFetch.map((b) => this.updateImageProp(b));
    }
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

  updateImageProp(item: any): any {
    let { image, ...pro } = item;
    image = Array.isArray(image) ? image[0] : image;
    const updated = this.urlFor(image).url();
    return { ...pro, image: updated };
  }

  getProducts(
    limit = "6",
    sort = "A - Z",
    category?: string
  ): Observable<Product[]> {
    if (this.products) {
      this.products = this.products.map((p) => this.updateImageProp(p));
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
              this.products,
              Number(limit),
              sort,
              category
            );
            return filteredData;
          })
      );
    }
  }

  getCategories(): Observable<string[]> {
    const productQuery = "*[_type == 'product']";

    return from(
      this.sanityClientCredentials
        .fetch<Product[]>(productQuery)
        .then((data) =>
          data
            .map((d: Product) => d.category)
            .filter(
              (category, index, categories) =>
                categories.indexOf(category) === index
            )
        )
    );
  }
}
