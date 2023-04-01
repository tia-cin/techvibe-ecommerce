import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../types";
import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

@Injectable({
  providedIn: "root",
})
export class SanityService {
  data: any;
  constructor() {}

  sanityClientCredentials = {
    option: sanityClient({
      projectId: "wrbpjeis",
      dataset: "production",
      token: process.env["TOKEN"],
    }),
  };

  urlFor = (source: any) =>
    imageUrlBuilder(this.sanityClientCredentials.option).image(source);

  async ngOnInit() {
    var productQuery = "[_type == 'product']";
    var bannerQuery = "[_type == 'banner']";

    let data1 = await this.sanityClientCredentials.option.fetch(productQuery);
    let data2 = await this.sanityClientCredentials.option.fetch(bannerQuery);

    this.data = { data1, data2 };

    console.log(this.data);
  }
}
