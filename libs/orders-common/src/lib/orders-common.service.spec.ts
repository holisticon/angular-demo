import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { newOrder, order } from '@ngxp/orders-common/test';
import { getId } from '@ngxp/resource';
import { cold } from 'jest-marbles';
import { toNewOrderRequest } from './new-order-request.mapper';
import { OrdersCommonService } from './orders-common.service';

describe('OrdersCommonService', () => {
    let ordersCommonService: OrdersCommonService;
    let httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [OrdersCommonService]
        });

        ordersCommonService = TestBed.get(OrdersCommonService);
        httpController = TestBed.get(HttpTestingController);
    });

    describe('placeOrder', () => {
        it('submits the given addition to the shopping cart to the backend', () => {
            ordersCommonService
                .placeOrder(newOrder)
                .subscribe(createdOrder => {
                    expect(createdOrder).toBe(order);
                });

            const postRequest = httpController.expectOne('http://localhost:80/orders');

            expect(postRequest.request.method).toEqual('POST');
            expect(postRequest.request.body).toEqual(toNewOrderRequest(newOrder));

            postRequest.flush(null, {
                status: 201,
                statusText: 'Created',
                headers: {
                    Location: `http://localhost:80/orders/${getId(order)}`
                }
            });

            const getRequest = httpController.expectOne(`http://localhost:80/orders/${getId(order)}`);

            expect(getRequest.request.method).toEqual('GET');

            getRequest.flush(order);

            httpController.verify();
        });

        it('returns an empty observable if the server response contains no location header', () => {
            const returnedObservable = ordersCommonService.placeOrder(newOrder);

            returnedObservable.subscribe();
            expect(returnedObservable).toBeObservable(cold(''));

            const postRequest = httpController.expectOne('http://localhost:80/orders');

            postRequest.flush(null, {
                status: 201,
                statusText: 'Created'
            });

            httpController.verify();
        });
    });

});
