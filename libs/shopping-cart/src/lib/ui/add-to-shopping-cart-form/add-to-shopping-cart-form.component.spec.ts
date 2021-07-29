import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { resourceUri } from '@holisticon/resource/test';
import { provideStoreServiceMock } from '@ngxp/store-service/testing';
import { AdditionToShoppingCart } from '../../domain';
import { ShoppingCartStore } from '../../state';
import { AddToShoppingCartFormComponent } from './add-to-shopping-cart-form.component';

describe('AddToShoppingCartFormComponent', () => {
    let component: AddToShoppingCartFormComponent;
    let fixture: ComponentFixture<AddToShoppingCartFormComponent>;

    let shoppingCartStore: ShoppingCartStore;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule
            ],
            providers: [
                provideStoreServiceMock(ShoppingCartStore)
            ],
            declarations: [
                AddToShoppingCartFormComponent
            ]
        })
            .compileComponents();

        shoppingCartStore = TestBed.inject(ShoppingCartStore) as any;
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddToShoppingCartFormComponent);
        component = fixture.componentInstance;
        component.product = resourceUri;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('dispatches an addToShoppingCart action when the form is submitted', () => {
        const addToShoppingCartSpy = spyOn(shoppingCartStore, 'addToShoppingCart');
        const form = fixture.debugElement.query(By.css('form'));
        const expectedQuantity = 2;
        fixture.componentInstance.quantity = expectedQuantity;
        const additionToShoppingCart: AdditionToShoppingCart = {
            product: resourceUri,
            quantity: expectedQuantity
        };

        form.nativeElement.dispatchEvent(new Event('submit'));

        expect(addToShoppingCartSpy).toHaveBeenCalledWith({ additionToShoppingCart });
    });
});
