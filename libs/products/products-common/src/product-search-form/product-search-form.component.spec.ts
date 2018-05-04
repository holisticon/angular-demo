import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { expectElementFromFixture } from 'ngx-test-helpers';
import { HomepageModule } from '../homepage.module';
import { ProductSearchFormComponent } from './product-search-form.component';

describe('ProductSearchFormComponent', () => {
    let component: ProductSearchFormComponent;
    let fixture: ComponentFixture<ProductSearchFormComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [HomepageModule]
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

    it('emits a submit event with the query on sumbit', () => {
        const submitEvent = new Event('submit');
        const preventDefaultSpy = jest.spyOn(submitEvent, 'preventDefault');

        const expectedQuery = 'query';
        fixture.componentInstance.query.setValue(expectedQuery);

        const emitSpy = jest.spyOn(fixture.componentInstance.search, 'emit');

        fixture.componentInstance.onSubmit(submitEvent);

        expect(preventDefaultSpy).toHaveBeenCalled();
        expect(emitSpy).toHaveBeenCalledWith(expectedQuery);
    });
});
