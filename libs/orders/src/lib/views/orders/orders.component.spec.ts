import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { orderHistory } from '@holisticon/orders/test';
import { provideStoreServiceMock } from '@ngxp/store-service/testing';
import { OrdersStore } from '../../state';
import { OrdersComponent } from './orders.component';

describe('OrdersComponent', () => {
    let fixture: ComponentFixture<OrdersComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                OrdersComponent
            ],
            providers: [
                provideStoreServiceMock(OrdersStore, {
                    getOrderHistory: orderHistory
                })
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OrdersComponent);
        fixture.detectChanges();
    });

    it('renders a holisticon-order for each order', () => {
        const orderComponents = fixture.debugElement.queryAll(By.css('holisticon-order'));

        expect(orderComponents.length).toBe(orderComponents.length);

        orderHistory.orders.forEach((order, index) => {
            const orderComponent = orderComponents[index].nativeElement;
            expect(orderComponent.order).toEqual(order);
        });
    });
});
