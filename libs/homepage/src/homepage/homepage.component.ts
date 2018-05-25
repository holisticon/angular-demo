import { Component } from '@angular/core';
import { SearchProductsAction } from '@luchsamapparat/products-common';
import { Store } from '@ngrx/store';

@Component({
  selector: 'cfha-homepage',
  templateUrl: './homepage.component.html'
})
export class HomepageComponent {

    constructor(
        private store: Store<void>
    ) {}

    onProductSearch(query: string) {
        this.store.dispatch(new SearchProductsAction(query));
    }

}
