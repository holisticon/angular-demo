import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { additionToShoppingCart, shoppingCart } from '@ngxp/shopping-cart-common/test';
import { cold } from 'jasmine-marbles';
import { ShoppingCartCommonService } from './shopping-cart-common.service';

describe('ShoppingCartCommonService', () => {
    let shoppingCartCommonService: ShoppingCartCommonService;
    let httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ShoppingCartCommonService]
        });

        shoppingCartCommonService = TestBed.get(ShoppingCartCommonService);
        httpController = TestBed.get(HttpTestingController);
    });

    describe('addToShoppingCart', () => {
        it('submits the given addition to the shopping cart to the backend', () => {
            shoppingCartCommonService
                .addToShoppingCart(additionToShoppingCart)
                .subscribe(returnedShoppingCart => {
                    expect(returnedShoppingCart).toBe(shoppingCart);
                });

            const postRequest = httpController.expectOne('https://example.hypercontract.org/shoppingCart/items');

            expect(postRequest.request.method).toEqual('POST');
            expect(postRequest.request.body).toEqual(additionToShoppingCart);

            postRequest.flush(null, {
                status: 201,
                statusText: 'Created',
                headers: {
                    Location: 'https://example.hypercontract.org/shoppingCart'
                }
            });

            const getRequest = httpController.expectOne('https://example.hypercontract.org/shoppingCart');

            expect(getRequest.request.method).toEqual('GET');

            getRequest.flush(shoppingCart);

            httpController.verify();
        });

        it('returns an empty observable if the server response contains no location header', () => {
            expect(
                shoppingCartCommonService.addToShoppingCart(additionToShoppingCart)
            ).toBeObservable(cold('-'));

            const postRequest = httpController.expectOne('https://example.hypercontract.org/shoppingCart/items');

            postRequest.flush(null, {
                status: 201,
                statusText: 'Created'
            });

            httpController.verify();
        });
    });

});
