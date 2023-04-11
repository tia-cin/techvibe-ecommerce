import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-products-header",
  templateUrl: "./products-header.component.html",
})
export class ProductsHeaderComponent implements OnInit {
  @Output() colsChange = new EventEmitter<number>();
  @Output() onCurrentSort = new EventEmitter<string>();
  @Output() onCurrentCount = new EventEmitter<number>();

  sort = "A - Z";
  itemsCount = 6;

  constructor() {}

  ngOnInit(): void {}

  onSortUpdated(sortBy: string): void {
    this.onCurrentSort.emit(sortBy);
    this.sort = sortBy;
  }

  onItemsDisplayed(items: number): void {
    this.onCurrentCount.emit(items);
    this.itemsCount = items;
  }

  onColsDisplay(cols: number): void {
    this.colsChange.emit(cols);
  }
}
