import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Order, OrderStatus } from '@ngxp/orders-common';
import { AddressComponent, PaymentOptionComponent } from '@ngxp/user-profile-common';
import { OrderComponent } from './order.component';
import { order } from '@ngxp/orders-common/test';

describe('OrderComponent', () => {
    let component: OrderComponent;
    let fixture: ComponentFixture<OrderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                OrderComponent,
                AddressComponent,
                PaymentOptionComponent
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OrderComponent);
        component = fixture.componentInstance;
        component.order = order;
        fixture.detectChanges();
    });

    it('renders the order status', () => {
        expect(fixture.debugElement.query(By.css('.status')).nativeElement.textContent).toBe(order.status);
    });

    it('renders the billing address as ngxp-address', () => {
        const billingAddress: AddressComponent = fixture.debugElement.queryAll(By.directive(AddressComponent))
            .find(address => address.parent.nativeElement.classList.contains('billing-address'))
            .componentInstance;

        expect(billingAddress.address).toBe(order.billingAddress);
    });

    it('renders the shipping address as ngxp-address', () => {
        const addresses = fixture.debugElement.queryAll(By.directive(AddressComponent));
        const shippingAddressComponent = addresses
            .find(address => address.parent.nativeElement.classList.contains('shipping-address'));
        const shippingAddress: AddressComponent = shippingAddressComponent.componentInstance;

        expect(shippingAddress.address).toBe(order.shippingAddress);
    });

    it('renders the payent as ngxp-payent-option', () => {
        const paymentOption: PaymentOptionComponent = fixture.debugElement.query(By.directive(PaymentOptionComponent)).componentInstance;

        expect(paymentOption.paymentOption).toBe(order.payment);
    });
});
