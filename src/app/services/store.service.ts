import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../types";

const API_URL = "https://fakestoreapi.com";

@Injectable({
  providedIn: "root",
})
export class StoreService {
  constructor(private httpClient: HttpClient) {}

  getAllProducts(
    limit: string = "12",
    sort = "Z - A",
    category?: string
  ): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      `${API_URL}/products/${category && "categoty/" + category}/?sort=${
        sort === "Z - A" ? "desc" : "asc"
      }&limit=${limit}`
    );
  }
}
