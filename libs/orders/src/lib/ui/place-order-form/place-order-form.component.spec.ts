import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { orderItems } from '@ngxp/orders/test';
import { provideStoreServiceMock, StoreServiceMock } from '@ngxp/store-service/testing';
import { UserProfileStore } from '@ngxp/user-profile/state';
import { userProfile } from '@ngxp/user-profile/test';
import { isNull } from 'lodash-es';
import { NewOrder } from '../../domain';
import { OrdersStore } from '../../state';
import { PlaceOrderFormComponent } from './place-order-form.component';

describe('PlaceOrderFormComponent', () => {
    let component: PlaceOrderFormComponent;
    let fixture: ComponentFixture<PlaceOrderFormComponent>;

    let ordersStore: StoreServiceMock<OrdersStore>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule
            ],
            declarations: [
                PlaceOrderFormComponent
            ],
            providers: [
                provideStoreServiceMock(OrdersStore),
                provideStoreServiceMock(UserProfileStore, {
                    getAddresses: userProfile.addresses,
                    getPaymentOptions: userProfile.paymentOptions
                })
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ]
        })
            .compileComponents();

        ordersStore = TestBed.inject(OrdersStore) as any;
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PlaceOrderFormComponent);
        component = fixture.componentInstance;
        component.orderItems = orderItems;
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

    it('dispatches a PlaceOrderAction when the form is submitted', waitForAsync(() => {
        const placeOrderSpy = jest.spyOn(ordersStore, 'placeOrder');
        const expectedOrder: NewOrder = {
            billingAddress: userProfile.addresses[0],
            shippingAddress: userProfile.addresses[0],
            payment: userProfile.paymentOptions[0],
            orderItems
        };
        const form = fixture.debugElement.query(By.css('form'));

        form.nativeElement.dispatchEvent(new Event('submit'));

        expect(placeOrderSpy).toHaveBeenCalledWith({ newOrder: expectedOrder });
    }));
});
