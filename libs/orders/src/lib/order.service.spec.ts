import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { addId } from '@luchsamapparat/common';
import { Order, OrderStatus } from '@luchsamapparat/orders-common';
import { OrderService } from './order.service';


describe('OrderService', () => {
    let orderService: OrderService;
    let httpController: HttpTestingController;

    const orders: Order[] = [addId({
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
    }, 'id')];

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

            const request = httpController.expectOne(`http://localhost/orders`);

            expect(request.request.method).toEqual('GET');

            request.flush(orders);

            httpController.verify();
        });
    });

});
