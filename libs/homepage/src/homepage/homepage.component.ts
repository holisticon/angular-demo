import { Component } from '@angular/core';

@Component({
  selector: 'cfha-homepage',
  templateUrl: './homepage.component.html'
})
export class HomepageComponent {

    onProductSearch(query: string) {
        console.log(query);
    }

}
