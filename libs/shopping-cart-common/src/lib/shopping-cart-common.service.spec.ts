import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { addId } from '@luchsamapparat/common';
import { AdditionToShoppingCart, ShoppingCart } from '@luchsamapparat/shopping-cart-common';
import { ShoppingCartCommonService } from './shopping-cart-common.service';

describe('ShoppingCartCommonService', () => {
    let shoppingCartCommonService: ShoppingCartCommonService;
    let httpController: HttpTestingController;

    const shoppingCartItem = addId({
        name: '',
        description: '',
        price: 1,
        product: 'id',
        quantity: 1
    }, 'id');

    const shoppingCart: ShoppingCart = {
        totalPrice: 1,
        items: [shoppingCartItem]
    };

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
            const additionToShoppingCart: AdditionToShoppingCart = {
                product: 'id',
                quantity: 2
            };

            shoppingCartCommonService
                .addToShoppingCart(additionToShoppingCart)
                .subscribe(returnedShoppingCart => {
                    expect(returnedShoppingCart).toBe(shoppingCart);
                });

            const postRequest = httpController.expectOne(`http://hypercontract.herokuapp.com/shoppingCart/items`);

            expect(postRequest.request.method).toEqual('POST');
            expect(postRequest.request.body).toEqual(additionToShoppingCart);

            postRequest.flush(null, {
                status: 201,
                statusText: 'Created',
                headers: {
                    Location: 'http://hypercontract.herokuapp.com/shoppingCart'
                }
            });

            const getRequest = httpController.expectOne(`http://hypercontract.herokuapp.com/shoppingCart`);

            expect(getRequest.request.method).toEqual('GET');

            getRequest.flush(shoppingCart);

            httpController.verify();
        });
    });

});
