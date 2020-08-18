import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { orderItems } from '@ngxp/orders/test';
import { userProfile } from '@ngxp/user-profile/test';
import { isNull } from 'lodash-es';
import { take } from 'rxjs/operators';
import { NewOrder } from '../../domain';
import { AddressOptionsComponent, AddressOptionsModule } from './address-options/address-options.component';
import { PaymentOptionOptionsComponent, PaymentOptionOptionsModule } from './payment-option-options/payment-option-options.component';
import { PlaceOrderFormComponent } from './place-order-form.component';

describe('PlaceOrderFormComponent', () => {
    let component: PlaceOrderFormComponent;
    let fixture: ComponentFixture<PlaceOrderFormComponent>;

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
        it('renders the addresses of the given user profile as options for the billing address', () => {
            const addressOptions: AddressOptionsComponent = fixture.debugElement.queryAll(By.css('ngxp-address-options'))
                .filter(address => !isNull(address.nativeElement.closest('.billing-address')))[0].componentInstance;

            expect(addressOptions.addressOptions).toEqual(userProfile.addresses);
        });
    });

    describe('shippingAddress', () => {
        it('renders the addresses of the given user profile as options for the shipping address', () => {
            const addressOptions: AddressOptionsComponent = fixture.debugElement.queryAll(By.css('ngxp-address-options'))
                .filter(address => !isNull(address.nativeElement.closest('.shipping-address')))[0].componentInstance;

            expect(addressOptions.addressOptions).toEqual(userProfile.addresses);
        });
    });

    describe('payment', () => {
        it('renders the payment options of the given user profile as options for the payment', () => {
            const paymentOptionOptions: PaymentOptionOptionsComponent = fixture.debugElement.query(By.css('ngxp-payment-option-options')).componentInstance;

            expect(paymentOptionOptions.paymentOptionOptions).toEqual(userProfile.paymentOptions);
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
