import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { product } from '@ngxp/products/domain/test';
import { ProductImageComponent } from './product-image.component';

describe('ProductImageComponent', () => {
    let component: ProductImageComponent;
    let fixture: ComponentFixture<ProductImageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ProductImageComponent
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductImageComponent);
        component = fixture.componentInstance;
    });

    it('does not render anything if no product is given', () => {
        component.product = null;

        fixture.detectChanges();

        expect(fixture.debugElement.children).toHaveLength(0);
    });

    describe('with product given', () => {
        beforeEach(() => {
            component.product = product;
            fixture.detectChanges();
        });

        it('renders an image with the product image url', () => {
            expect(fixture.debugElement.query(By.css('img')).nativeElement.src).toBe(product.image);
        });
    });
});
