import { ChangeDetectionStrategy, Component, EventEmitter, NgModule, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'holisticon-product-search-form',
    templateUrl: './product-search-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSearchFormComponent {

    @Output()
    search = new EventEmitter<string>();

    queryString = new FormControl();

    onSubmit(event: Event) {
        event.preventDefault();
        this.search.emit(this.queryString.value);
    }
}

@NgModule({
    declarations: [ProductSearchFormComponent],
    exports: [ProductSearchFormComponent],
    imports: [FormsModule, ReactiveFormsModule]
})
export class ProductSearchFormModule { }
