import { HttpClient } from "@angular/common/http";
import { Component, OnInit, Input } from "@angular/core";
import { Banner } from "src/app/types";
import { loadStripe } from "@stripe/stripe-js";

@Component({
  selector: "app-header-banner",
  templateUrl: "./header-banner.component.html",
})
export class HeaderBannerComponent implements OnInit {
  @Input() banner: Banner | undefined;

  constructor(private client: HttpClient) {}

  ngOnInit(): void {}

  onCheckout(): void {
    this.client
      .post("http://localhost:4201/checkout", {
        items: [
          {
            image: this.banner?.image,
            name: this.banner?.product,
            price: 350,
            quantity: 1,
            id: 1,
          },
        ],
      })
      .subscribe(async (res: any) => {
        let stripe = await loadStripe(
          "pk_test_51LqFYzENi5vsUdl1S6DlnTj64Jppk67ktJiaASMWUwXgYyEGgZxtHtcdvDINlnNK537BxkTeoacuedDo8Hjpe8X600jUwt0g3d"
        );
        stripe?.redirectToCheckout({
          sessionId: res.id,
        });
      });
  }
}
