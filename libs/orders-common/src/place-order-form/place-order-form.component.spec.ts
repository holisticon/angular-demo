import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { addId } from '@luchsamapparat/common';
import { NewOrder } from '@luchsamapparat/orders-common';
import { ShoppingCart } from '@luchsamapparat/shopping-cart-common';
import { AddressComponent, PaymentOptionComponent, UserProfile } from '@luchsamapparat/user-profile-common';
import { isNull } from 'lodash-es';
import 'rxjs/add/operator/take';
import { PlaceOrderFormComponent } from './place-order-form.component';

describe('PlaceOrderFormComponent', () => {
    let component: PlaceOrderFormComponent;
    let fixture: ComponentFixture<PlaceOrderFormComponent>;

    const shoppingCart: ShoppingCart = {
        items: [addId({
            name: '',
            description: '',
            price: 1,
            product: 'id',
            quantity: 1
        }, 'id')],
        totalPrice: 1
    };

    const userProfile: UserProfile = {
        addresses: [addId({
            city: '',
            country: '',
            name: '',
            street: '',
            zipCode: ''
        }, 'id')],
        paymentOptions: [addId({
            accountOwner: '',
            bic: '',
            iban: ''
        }, 'id')]
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule
            ],
            declarations: [
                AddressComponent,
                PaymentOptionComponent,
                PlaceOrderFormComponent
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PlaceOrderFormComponent);
        component = fixture.componentInstance;
        component.shoppingCart = shoppingCart;
        component.userProfile = userProfile;
        fixture.detectChanges();
    });

    describe('billingAddress', () => {
        it('renders each address of the given user profile as option for billing address', () => {
            const billingAddresses: AddressComponent[] = fixture.debugElement.queryAll(By.directive(AddressComponent))
                .filter(address => !isNull(address.nativeElement.closest('.billing-address')))
                .map((address: DebugElement) => address.componentInstance);

            userProfile.addresses.forEach((address, index) => {
                const addressComponent = billingAddresses[index];
                expect(addressComponent.address).toBe(address);
            });
        });

        it('selects the first billing address by default', () => {
            expect(component.form.value.billingAddress).toBe(userProfile.addresses[0]);
        });
    });

    describe('shippingAddress', () => {
        it('renders each address of the given user profile as option for shipping address', () => {
            const shippingAddresses: AddressComponent[] = fixture.debugElement.queryAll(By.directive(AddressComponent))
            .filter(address => !isNull(address.nativeElement.closest('.shipping-address')))
            .map((address: DebugElement) => address.componentInstance);

            userProfile.addresses.forEach((address, index) => {
                const addressComponent = shippingAddresses[index];
                expect(addressComponent.address).toBe(address);
            });
        });

        it('selects the first shipping address by default', () => {
            expect(component.form.value.shippingAddress).toBe(userProfile.addresses[0]);
        });
    });

    describe('payment', () => {
        it('renders each payment option of the given user profile as option for payment', () => {
            const paymentOptions: PaymentOptionComponent[] = fixture.debugElement.queryAll(By.directive(PaymentOptionComponent))
                .map((address: DebugElement) => address.componentInstance);

            userProfile.paymentOptions.forEach((paymentOption, index) => {
                const payment = paymentOptions[index];
                expect(payment.paymentOption).toBe(paymentOption);
            });
        });

        it('selects the first payment option by default', () => {
            expect(component.form.value.payment).toBe(userProfile.paymentOptions[0]);
        });
    });

    it('emits a placeOrder event when the form is submitted', () => {
        const expectedOrder: NewOrder = {
            billingAddress: userProfile.addresses[0],
            shippingAddress: userProfile.addresses[0],
            payment: userProfile.paymentOptions[0],
            shoppingCart
        };
        const form = fixture.debugElement.query(By.css('form'));

        fixture.componentInstance.placeOrder
            .take(1)
            .subscribe(newOrder => {
                expect(newOrder).toEqual(expectedOrder);
            })

        form.nativeElement.dispatchEvent(new Event('submit'));
    });
});
