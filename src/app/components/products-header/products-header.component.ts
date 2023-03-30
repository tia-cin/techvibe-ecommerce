import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-products-header",
  templateUrl: "./products-header.component.html",
})
export class ProductsHeaderComponent implements OnInit {
  sort = "A - Z";
  constructor() {}

  ngOnInit(): void {}

  onSortUpdated(sortBy: string): void {
    this.sort = sortBy;
  }
}
