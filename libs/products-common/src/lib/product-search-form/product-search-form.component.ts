import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'ngxp-product-search-form',
    templateUrl: './product-search-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSearchFormComponent {

    @Output()
    search = new EventEmitter<string>();

    query = new FormControl();

    onSubmit(event: Event) {
        event.preventDefault();
        this.search.emit(this.query.value);
    }
}
