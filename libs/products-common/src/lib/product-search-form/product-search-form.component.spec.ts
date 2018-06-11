import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { expectElementFromFixture } from 'ngx-test-helpers';
import 'rxjs/add/operator/take';
import { ProductSearchFormComponent } from './product-search-form.component';

describe('ProductSearchFormComponent', () => {
    let component: ProductSearchFormComponent;
    let fixture: ComponentFixture<ProductSearchFormComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [
                    FormsModule,
                    ReactiveFormsModule
                ],
                declarations: [
                    ProductSearchFormComponent
                ]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductSearchFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('renders a product search form', () => {
        expectElementFromFixture(fixture, 'form').not.toBeNull();
    });

    it('emits a search event with the query on sumbit', () => {
        const expectedQuery = 'query';
        const form = fixture.debugElement.query(By.css('form'));
        const quantityFormControl = fixture.componentInstance.query.setValue(expectedQuery);

        fixture.componentInstance.search
            .take(1)
            .subscribe(query => {
                expect(query).toBe(expectedQuery);
            })

        form.nativeElement.dispatchEvent(new Event('submit'));
    });
});
