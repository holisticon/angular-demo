import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Order, OrderStatus } from '@ngxp/orders-common';
import { OrderService } from './order.service';
import { orders } from '@ngxp/orders-common/test';


describe('OrderService', () => {
    let orderService: OrderService;
    let httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                OrderService
            ]
        });

        orderService = TestBed.get(OrderService);
        httpController = TestBed.get(HttpTestingController);
    });

    describe('loadOrders', () => {
        it('loads the orders from the backend', () => {
            orderService
                .loadOrders()
                .subscribe(returnedOrders => {
                    expect(returnedOrders).toBe(orders);
                });

            const request = httpController.expectOne(`http://example.hypercontract.org/orders`);

            expect(request.request.method).toEqual('GET');

            request.flush(orders);

            httpController.verify();
        });
    });

});
