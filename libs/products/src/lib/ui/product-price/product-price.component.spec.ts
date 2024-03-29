import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { product } from '@holisticon/products/test';
import { ProductPriceComponent } from './product-price.component';


describe('ProductPriceComponent', () => {
    let component: ProductPriceComponent;
    let fixture: ComponentFixture<ProductPriceComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                ProductPriceComponent
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductPriceComponent);
        component = fixture.componentInstance;
    });

    it('does not render anything if no product is given', () => {
        component.product = null;

        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('.price')).nativeElement.textContent).toBe('');
    });

    describe('with product given', () => {
        beforeEach(() => {
            component.product = product;
            fixture.detectChanges();
        });

        it('renders product price', () => {
            expect(fixture.debugElement.query(By.css('.price')).nativeElement.textContent).toMatch(/\d+\.\d{2}/);
        });
    });
});
