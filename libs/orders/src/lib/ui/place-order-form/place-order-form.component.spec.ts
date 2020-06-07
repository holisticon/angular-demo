import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { orderItems } from '@ngxp/orders/test';
import { userProfile } from '@ngxp/user-profile/test';
import { isNull } from 'lodash-es';
import { take } from 'rxjs/operators';
import { NewOrder } from '../../domain';
import { PlaceOrderFormComponent } from './place-order-form.component';

describe('PlaceOrderFormComponent', () => {
    let component: PlaceOrderFormComponent;
    let fixture: ComponentFixture<PlaceOrderFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule
            ],
            declarations: [
                PlaceOrderFormComponent
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PlaceOrderFormComponent);
        component = fixture.componentInstance;
        component.orderItems = orderItems;
        component.userProfile = userProfile;
        fixture.detectChanges();
    });

    describe('billingAddress', () => {
        it('renders each address of the given user profile as option for billing address', () => {
            const billingAddresses = fixture.debugElement.queryAll(By.css('ngxp-address'))
                .filter(address => !isNull(address.nativeElement.closest('.billing-address')))
                .map((address: DebugElement) => address.nativeElement);

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
            const shippingAddresses = fixture.debugElement.queryAll(By.css('ngxp-address'))
                .filter(address => !isNull(address.nativeElement.closest('.shipping-address')))
                .map((address: DebugElement) => address.nativeElement);

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
            const paymentOptions = fixture.debugElement.queryAll(By.css('ngxp-payment-option'))
                .map((address: DebugElement) => address.nativeElement);

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
            orderItems
        };
        const form = fixture.debugElement.query(By.css('form'));

        fixture.componentInstance.placeOrder
            .pipe(take(1))
            .subscribe(newOrder => {
                expect(newOrder).toEqual(expectedOrder);
            })

        form.nativeElement.dispatchEvent(new Event('submit'));
    });
});
