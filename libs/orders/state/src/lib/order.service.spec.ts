import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { newOrder, order, orders } from '@ngxp/orders/domain/test';
import { toNewOrderRequest } from './new-order-request.mapper';
import { OrderService } from './order.service';

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

        orderService = TestBed.inject(OrderService);
        httpController = TestBed.inject(HttpTestingController);
    });

    describe('loadOrders', () => {
        it('loads the orders from the backend', () => {
            orderService
                .loadOrderHistory()
                .subscribe(returnedOrders => {
                    expect(returnedOrders).toBe(orders);
                });

            const request = httpController.expectOne('https://example.hypercontract.org/orders');

            expect(request.request.method).toEqual('GET');

            request.flush(orders);

            httpController.verify();
        });
    });

    describe('placeOrder', () => {
        it('submits the given addition to the shopping cart to the backend', () => {
            orderService
                .placeOrder(newOrder)
                .subscribe(createdOrder => {
                    expect(createdOrder).toBe(order);
                });

            const postRequest = httpController.expectOne('https://example.hypercontract.org/orders');

            expect(postRequest.request.method).toEqual('POST');
            expect(postRequest.request.body).toEqual(toNewOrderRequest(newOrder));

            postRequest.flush(order);

            httpController.verify();
        });
    });

});
