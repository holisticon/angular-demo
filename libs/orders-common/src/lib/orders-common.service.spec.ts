import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { addId, getId } from '@luchsamapparat/common';
import { toNewOrderRequest } from './new-order-request.mapper';
import { NewOrder, Order, OrderStatus } from './order.model';
import { OrdersCommonService } from './orders-common.service';

describe('OrdersCommonService', () => {
    let ordersCommonService: OrdersCommonService;
    let httpController: HttpTestingController;

    const newOrder: NewOrder = {
        shoppingCart: {
            items: [addId({
                name: '',
                description: '',
                price: 1,
                product: 'id',
                quantity: 1
            }, 'id')],
            totalPrice: 1
        },
        billingAddress: addId({
            city: '',
            country: '',
            name: '',
            street: '',
            zipCode: ''
        }, 'id'),
        shippingAddress: addId({
            city: '',
            country: '',
            name: '',
            street: '',
            zipCode: ''
        }, 'id'),
        payment: addId({
            accountOwner: '',
            bic: '',
            iban: ''
        }, 'id')
    };

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
    };

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

            const postRequest = httpController.expectOne(`http://hypercontract.herokuapp.com/orders`);

            expect(postRequest.request.method).toEqual('POST');
            expect(postRequest.request.body).toEqual(toNewOrderRequest(newOrder));

            postRequest.flush(null, {
                status: 201,
                statusText: 'Created',
                headers: {
                    Location: `http://hypercontract.herokuapp.com/orders/${getId(order)}`
                }
            });

            const getRequest = httpController.expectOne(`http://hypercontract.herokuapp.com/orders/${getId(order)}`);

            expect(getRequest.request.method).toEqual('GET');

            getRequest.flush(order);

            httpController.verify();
        });
    });

});
