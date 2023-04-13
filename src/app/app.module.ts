import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { MatSidenavModule } from "@angular/material/sidenav";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTableModule } from "@angular/material/table";
import { MatBadgeModule } from "@angular/material/badge";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatListModule } from "@angular/material/list";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { HomeComponent } from "./pages/home/home.component";
import { PurchaseComponent } from "./pages/purchase/purchase.component";

import { HeaderComponent } from "./components/header/header.component";
import { CartComponent } from "./components/cart/cart.component";
import { FiltersComponent } from "./components/filters/filters.component";
import { CardComponent } from "./components/card/card.component";
import { ProductsHeaderComponent } from "./components/products-header/products-header.component";
import { HeaderBannerComponent } from "./components/header-banner/header-banner.component";
import { FooterBannerComponent } from "./components/footer-banner/footer-banner.component";
import { FooterComponent } from "./components/footer/footer.component";

import { PurchaseService } from "./services/purchase.service";
import { SanityService } from "./services/sanity.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CartComponent,
    PurchaseComponent,
    FiltersComponent,
    CardComponent,
    ProductsHeaderComponent,
    HeaderBannerComponent,
    FooterBannerComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatGridListModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatToolbarModule,
    MatTableModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatListModule,
  ],
  providers: [PurchaseService, SanityService],
  bootstrap: [AppComponent],
})
export class AppModule {}
