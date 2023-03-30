import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-products-header",
  templateUrl: "./products-header.component.html",
})
export class ProductsHeaderComponent implements OnInit {
  @Output() colsChange = new EventEmitter<number>();

  sort = "A - Z";
  itemsCount = 6;

  constructor() {}

  ngOnInit(): void {}

  onSortUpdated(sortBy: string): void {
    this.sort = sortBy;
  }

  onItemsDisplayed(items: number): void {
    this.itemsCount = items;
  }

  onColsDisplay(cols: number): void {
    this.colsChange.emit(cols);
  }
}
