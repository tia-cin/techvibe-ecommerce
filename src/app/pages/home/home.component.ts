import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  cols = 3;
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
