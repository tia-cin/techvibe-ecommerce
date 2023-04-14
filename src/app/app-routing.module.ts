import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { PurchaseComponent } from "./pages/purchase/purchase.component";
import { DetailComponent } from "./pages/detail/detail.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "purchase", component: PurchaseComponent },
  { path: "product/:slug", component: DetailComponent },
  { path: "", redirectTo: "home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
