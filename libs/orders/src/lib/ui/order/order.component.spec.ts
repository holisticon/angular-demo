import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { order } from '@holisticon/orders/test';
import { OrderComponent } from './order.component';

describe('OrderComponent', () => {
    let component: OrderComponent;
    let fixture: ComponentFixture<OrderComponent>;

    beforeEach(waitForAsync(() => {
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
        expect(fixture.debugElement.query(By.css('.status')).nativeElement.textContent).toBe(order.orderStatus);
    });

    it('renders the billing address as holisticon-address', () => {
        const billingAddress = fixture.debugElement.queryAll(By.css('holisticon-address'))
            .find(address => address.parent?.nativeElement.classList.contains('billing-address'))
            ?.nativeElement;

        expect(billingAddress.address).toBe(order.billingAddress);
    });

    it('renders the shipping address as holisticon-address', () => {
        const shippingAddress = fixture.debugElement.queryAll(By.css('holisticon-address'))
            .find(address => address.parent?.nativeElement.classList.contains('shipping-address'))
            ?.nativeElement;

        expect(shippingAddress.address).toBe(order.shippingAddress);
    });

    it('renders the payent as holisticon-payent-option', () => {
        const paymentOption = fixture.debugElement.query(By.css('holisticon-payment-option')).nativeElement;

        expect(paymentOption.paymentOption).toBe(order.payment);
    });
});
