import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Order, OrderStatus } from '@luchsamapparat/orders-common';
import { StoreModule } from '@ngrx/store';
import { of as observableOf } from 'rxjs';
import { OrderComponent } from '../order/order.component';
import { OrdersStore } from '../state/orders-store.service';
import { OrdersComponent } from './orders.component';
import { provideStoreServiceMock } from '@ngx-patterns/store-service/testing';
import { orders } from '@luchsamapparat/orders-common/test';

describe('OrdersComponent', () => {
    let component: OrdersComponent;
    let fixture: ComponentFixture<OrdersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({}),
            ],
            declarations: [
                OrdersComponent,
                OrderComponent
            ],
            providers: [
                provideStoreServiceMock(OrdersStore, {
                    getOrders: orders
                })
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OrdersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('renders a cfha-order for each order', () => {
        const orderComponents = fixture.debugElement.queryAll(By.directive(OrderComponent));

        expect(orderComponents.length).toBe(orderComponents.length);

        orders.forEach((order, index) => {
            const orderComponent: OrderComponent = orderComponents[index].componentInstance;
            expect(orderComponent.order).toEqual(order);
        });
    });
});
