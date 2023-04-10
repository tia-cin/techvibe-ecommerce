import { Component, OnInit, Input } from "@angular/core";
import { Banner } from "src/app/types";

@Component({
  selector: "app-header-banner",
  templateUrl: "./header-banner.component.html",
})
export class HeaderBannerComponent implements OnInit {
  @Input() banner: Banner | undefined;

  constructor() {}

  ngOnInit(): void {}
}
