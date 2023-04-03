import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `<app-header></app-header> <router-outlet></router-outlet>
    <app-footer-banner></app-footer-banner>`,
  styles: [],
})
export class AppComponent {
  title = "tech-vibe";
}
