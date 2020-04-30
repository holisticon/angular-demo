import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { orderHistory } from '@ngxp/orders/domain/test';
import { OrdersStore } from '@ngxp/orders/state';
import { OrderComponent } from '@ngxp/orders/ui';
import { provideStoreServiceMock } from '@ngxp/store-service/testing';
import { OrdersComponent } from './orders.component';

describe('OrdersComponent', () => {
    let component: OrdersComponent;
    let fixture: ComponentFixture<OrdersComponent>;

    beforeEach(async(() => {
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
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('renders a ngxp-order for each order', () => {
        const orderComponents = fixture.debugElement.queryAll(By.css('ngxp-order'));

        expect(orderComponents.length).toBe(orderComponents.length);

        orderHistory.orders.forEach((order, index) => {
            const orderComponent: OrderComponent = orderComponents[index].nativeElement;
            expect(orderComponent.order).toEqual(order);
        });
    });
});
