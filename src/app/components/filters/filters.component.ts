import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  OnDestroy,
} from "@angular/core";
import { Subscription } from "rxjs";
import { SanityService } from "src/app/services/sanity.service";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() currentCategory = new EventEmitter<string>();

  categories: string[] | undefined;
  categoriesSubscription: Subscription | undefined;

  constructor(private sanityService: SanityService) {}

  ngOnInit(): void {
    this.categoriesSubscription = this.sanityService
      .getCategories()
      .subscribe((res: string[]) => {
        this.categories = res;
      });
  }

  onCurrentCategory(categ: string): void {
    this.currentCategory.next(categ);
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }
}
