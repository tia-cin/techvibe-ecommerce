import { Component, OnInit } from "@angular/core";

const ROW_HEIGHT: { [id: number]: number } = { 1: 400, 3: 355, 5: 380 };

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  cols: number = 3;
  rowHeight: number = ROW_HEIGHT[this.cols];
  category: string | undefined;

  constructor() {}

  ngOnInit(): void {}

  colsChange(cols: number): void {
    this.cols = cols;
  }

  currentCategory(categ: string): void {
    this.category = categ;
  }
}
