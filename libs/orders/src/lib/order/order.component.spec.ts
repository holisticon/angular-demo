// tslint:disable: no-non-null-assertion
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { order } from '@ngxp/orders-common/test';
import { OrderComponent } from './order.component';

describe('OrderComponent', () => {
    let component: OrderComponent;
    let fixture: ComponentFixture<OrderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                OrderComponent
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
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
        const billingAddress = fixture.debugElement.queryAll(By.css('ngxp-address'))
            .find(address => address.parent!.nativeElement.classList.contains('billing-address'))!
            .nativeElement;

        expect(billingAddress.address).toBe(order.billingAddress);
    });

    it('renders the shipping address as ngxp-address', () => {
        const shippingAddress = fixture.debugElement.queryAll(By.css('ngxp-address'))
            .find(address => address.parent!.nativeElement.classList.contains('shipping-address'))!
            .nativeElement;

        expect(shippingAddress.address).toBe(order.shippingAddress);
    });

    it('renders the payent as ngxp-payent-option', () => {
        const paymentOption = fixture.debugElement.query(By.css('ngxp-payment-option')).nativeElement;

        expect(paymentOption.paymentOption).toBe(order.payment);
    });
});
