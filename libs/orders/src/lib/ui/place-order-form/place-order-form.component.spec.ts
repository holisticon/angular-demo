import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { orderItems } from '@ngxp/orders/test';
import { provideStoreServiceMock, StoreServiceMock } from '@ngxp/store-service/testing';
import { UserProfileStore } from '@ngxp/user-profile/state';
import { addresses, paymentOptions, userProfile } from '@ngxp/user-profile/test';
import { isNull } from 'lodash-es';
import { NewOrder } from '../../domain';
import { OrdersStore } from '../../state';
import { AddressOptionsComponent, AddressOptionsModule } from './address-options/address-options.component';
import { PaymentOptionOptionsComponent, PaymentOptionOptionsModule } from './payment-option-options/payment-option-options.component';
import { PlaceOrderFormComponent } from './place-order-form.component';

describe('PlaceOrderFormComponent', () => {
    let component: PlaceOrderFormComponent;
    let fixture: ComponentFixture<PlaceOrderFormComponent>;

    let ordersStore: StoreServiceMock<OrdersStore>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule,
                AddressOptionsModule,
                PaymentOptionOptionsModule
            ],
            declarations: [
                PlaceOrderFormComponent
            ],
            providers: [
                provideStoreServiceMock(OrdersStore),
                provideStoreServiceMock(UserProfileStore, {
                    getAddresses: addresses,
                    getPaymentOptions: paymentOptions
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
        it('renders the addresses of the given user profile as options for the billing address', () => {
            const addressOptions: AddressOptionsComponent = fixture.debugElement.queryAll(By.css('ngxp-address-options'))
                .filter(address => !isNull(address.nativeElement.closest('.billing-address')))[0].componentInstance;

            expect(addressOptions.addressOptions).toEqual(addresses);
        });
    });

    describe('shippingAddress', () => {
        it('renders the addresses of the given user profile as options for the shipping address', () => {
            const addressOptions: AddressOptionsComponent = fixture.debugElement.queryAll(By.css('ngxp-address-options'))
                .filter(address => !isNull(address.nativeElement.closest('.shipping-address')))[0].componentInstance;

            expect(addressOptions.addressOptions).toEqual(addresses);
        });
    });

    describe('payment', () => {
        it('renders the payment options of the given user profile as options for the payment', () => {
            const paymentOptionOptions: PaymentOptionOptionsComponent = fixture.debugElement.query(By.css('ngxp-payment-option-options')).componentInstance;

            expect(paymentOptionOptions.paymentOptionOptions).toEqual(paymentOptions);
        });
    });

    it('dispatches a PlaceOrderAction when the form is submitted', async(() => {
        const newOrder: NewOrder = {
            billingAddress: userProfile.addresses[0],
            shippingAddress: userProfile.addresses[0],
            payment: userProfile.paymentOptions[0],
            orderItems
        };
        const placeOrderSpy = spyOn(ordersStore, 'placeOrder');
        const form = fixture.debugElement.query(By.css('form'));

        form.nativeElement.dispatchEvent(new Event('submit'));

        expect(placeOrderSpy).toHaveBeenCalledWith({ newOrder });
    }));
});
