import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { addId } from '@luchsamapparat/common';
import { AdditionToShoppingCart, ShoppingCart } from '@luchsamapparat/shopping-cart-common';
import { AddToShoppingCartService } from './add-to-shopping-cart.service';

describe('AddToShoppingCartService', () => {
    let shoppingCartService: AddToShoppingCartService;
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
            providers: [AddToShoppingCartService]
        });

        shoppingCartService = TestBed.get(AddToShoppingCartService);
        httpController = TestBed.get(HttpTestingController);
    });

    describe('addProduct', () => {
        it('submits the given addition to the shopping cart to the backend', () => {
            const additionToShoppingCart: AdditionToShoppingCart = {
                product: 'id',
                quantity: 2
            };

            shoppingCartService
                .addProduct(additionToShoppingCart)
                .subscribe(returnedShoppingCart => {
                    expect(returnedShoppingCart).toBe(shoppingCart);
                });

            const postRequest = httpController.expectOne(`http://localhost/shoppingCart/items`);

            expect(postRequest.request.method).toEqual('POST');
            expect(postRequest.request.body).toEqual(additionToShoppingCart);

            postRequest.flush(null, {
                status: 201,
                statusText: 'Created',
                headers: {
                    Location: 'http://localhost/shoppingCart'
                }
            });

            const getRequest = httpController.expectOne(`http://localhost/shoppingCart`);

            expect(getRequest.request.method).toEqual('GET');

            getRequest.flush(shoppingCart);

            httpController.verify();
        });
    });

});
