import { Component, OnInit, Input } from "@angular/core";
import { Banner } from "src/app/types";

@Component({
  selector: "app-footer-banner",
  templateUrl: "./footer-banner.component.html",
})
export class FooterBannerComponent implements OnInit {
  @Input() banner: Banner | undefined;

  constructor() {}

  ngOnInit(): void {}
}
