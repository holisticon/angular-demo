import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AddressComponent, PaymentOptionComponent } from '@luchsamapparat/user-profile-common';
import { OrderComponent } from '../order/order.component';
import { OrdersComponent } from './orders.component';


describe('OrdersComponent', () => {
    let component: OrdersComponent;
    let fixture: ComponentFixture<OrdersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                OrdersComponent,
                OrderComponent,
                AddressComponent,
                PaymentOptionComponent
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OrdersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
