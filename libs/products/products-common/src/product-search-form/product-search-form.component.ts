import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Output
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'cfha-product-search-form',
    templateUrl: './product-search-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSearchFormComponent {
    query = new FormControl();

    @Output() search = new EventEmitter<string>();

    onSubmit(event: Event) {
        event.preventDefault();
        this.search.emit(this.query.value);
    }
}
