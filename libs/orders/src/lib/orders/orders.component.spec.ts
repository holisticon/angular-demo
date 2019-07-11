import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { orders } from '@ngxp/orders-common/test';
import { provideStoreServiceMock } from '@ngxp/store-service/testing';
import { OrderComponent } from '../order/order.component';
import { OrdersStore } from '../state/orders-store.service';
import { OrdersComponent } from './orders.component';

describe('OrdersComponent', () => {
    let component: OrdersComponent;
    let fixture: ComponentFixture<OrdersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({}, {
                    runtimeChecks: {
                        strictStateImmutability: true,
                        strictActionImmutability: true
                    }
                }),
            ],
            declarations: [
                OrdersComponent
            ],
            providers: [
                provideStoreServiceMock(OrdersStore, {
                    getOrders: orders
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

        orders.forEach((order, index) => {
            const orderComponent: OrderComponent = orderComponents[index].nativeElement;
            expect(orderComponent.order).toEqual(order);
        });
    });
});
