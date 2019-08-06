import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { product } from '@ngxp/products-common/test';
import { getId } from '@ngxp/resource';
import { provideStoreServiceMock } from '@ngxp/store-service/testing';
import { AdditionToShoppingCart } from '../shopping-cart.model';
import { ShoppingCartCommonStore } from '../state/shopping-cart-common-store.service';
import { AddToShoppingCartFormComponent } from './add-to-shopping-cart-form.component';

describe('AddToShoppingCartFormComponent', () => {
    let component: AddToShoppingCartFormComponent;
    let fixture: ComponentFixture<AddToShoppingCartFormComponent>;

    let shoppingCartCommonStore: ShoppingCartCommonStore;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule
            ],
            providers: [
                provideStoreServiceMock(ShoppingCartCommonStore)
            ],
            declarations: [
                AddToShoppingCartFormComponent
            ]
        })
            .compileComponents();

        shoppingCartCommonStore = TestBed.get(ShoppingCartCommonStore);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddToShoppingCartFormComponent);
        component = fixture.componentInstance;
        component.product = product;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('dispatches an addToShoppingCart action when the form is submitted', () => {
        const addToShoppingCartSpy = spyOn(shoppingCartCommonStore, 'addToShoppingCart');
        const form = fixture.debugElement.query(By.css('form'));
        const expectedQuantity = 2;
        fixture.componentInstance.quantity = expectedQuantity;
        const additionToShoppingCart: AdditionToShoppingCart = {
            product: getId(product),
            quantity: expectedQuantity
        };

        form.nativeElement.dispatchEvent(new Event('submit'));

        expect(addToShoppingCartSpy).toHaveBeenCalledWith({ additionToShoppingCart });
    });
});
