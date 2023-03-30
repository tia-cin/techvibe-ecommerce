import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
})
export class FiltersComponent implements OnInit {
  @Output() currentCategory = new EventEmitter<string>();

  categories = ["earphones", "smartphones", "headphones", "smartwatches"];

  constructor() {}

  ngOnInit(): void {}

  onCurrentCategory(categ: string): void {
    this.currentCategory.emit(categ);
  }
}
