import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Order, OrderStatus } from '@luchsamapparat/orders-common';
import { AddressComponent, PaymentOptionComponent } from '@luchsamapparat/user-profile-common';
import { OrderComponent } from './order.component';

describe('OrderComponent', () => {
    let component: OrderComponent;
    let fixture: ComponentFixture<OrderComponent>;

    const order: Order = {
        billingAddress: {
            city: '',
            country: '',
            name: '',
            street: '',
            zipCode: ''
        },
        date: new Date().toISOString(),
        items: [],
        payment: {
            accountOwner: '',
            bic: '',
            iban: ''
        },
        shippingAddress: {
            city: '',
            country: '',
            name: '',
            street: '',
            zipCode: ''
        },
        status: OrderStatus.Processing
    }

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

    it('renders the billing address as cfha-address', () => {
        const billingAddress: AddressComponent = fixture.debugElement.queryAll(By.directive(AddressComponent))
            .find(address => address.parent.nativeElement.classList.contains('billing-address'))
            .componentInstance;

        expect(billingAddress.address).toBe(order.billingAddress);
    });

    it('renders the shipping address as cfha-address', () => {
        const addresses = fixture.debugElement.queryAll(By.directive(AddressComponent));
        const shippingAddressComponent = addresses
            .find(address => address.parent.nativeElement.classList.contains('shipping-address'));
        const shippingAddress: AddressComponent = shippingAddressComponent.componentInstance;

        expect(shippingAddress.address).toBe(order.shippingAddress);
    });

    it('renders the payent as cfha-payent-option', () => {
        const paymentOption: PaymentOptionComponent = fixture.debugElement.query(By.directive(PaymentOptionComponent)).componentInstance;

        expect(paymentOption.paymentOption).toBe(order.payment);
    });
});
