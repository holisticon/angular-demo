import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { newOrder, order, orders } from '@ngxp/orders/test';
import { getUri } from '@ngxp/resource';
import { cold } from 'jest-marbles';
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

        orderService = TestBed.get(OrderService);
        httpController = TestBed.get(HttpTestingController);
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

            postRequest.flush(null, {
                status: 201,
                statusText: 'Created',
                headers: {
                    Location: `https://example.hypercontract.org/orders/${getUri(order)}`
                }
            });

            const getRequest = httpController.expectOne(`https://example.hypercontract.org/orders/${getUri(order)}`);

            expect(getRequest.request.method).toEqual('GET');

            getRequest.flush(order);

            httpController.verify();
        });

        it('returns an empty observable if the server response contains no location header', () => {
            const returnedObservable = orderService.placeOrder(newOrder);

            returnedObservable.subscribe();
            expect(returnedObservable).toBeObservable(cold(''));

            const postRequest = httpController.expectOne('https://example.hypercontract.org/orders');

            postRequest.flush(null, {
                status: 201,
                statusText: 'Created'
            });

            httpController.verify();
        });
    });

});
