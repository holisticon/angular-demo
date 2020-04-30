import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { getUri } from '@ngxp/resource';
import { QuantityUpdate } from '@ngxp/shopping-cart/domain';
import { additionToShoppingCart, shoppingCart, shoppingCartItem } from '@ngxp/shopping-cart/domain/test';
import { ShoppingCartService } from './shopping-cart.service';

describe('ShoppingCartService', () => {
    let shoppingCartService: ShoppingCartService;
    let httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                ShoppingCartService
            ]
        });

        shoppingCartService = TestBed.inject(ShoppingCartService);
        httpController = TestBed.inject(HttpTestingController);
    });

    describe('loadShoppingCart', () => {
        it('loads the shopping cart from the backend', () => {
            shoppingCartService
                .loadShoppingCart()
                .subscribe(returnedShoppingCart => {
                    expect(returnedShoppingCart).toBe(shoppingCart);
                });

            const request = httpController.expectOne('https://example.hypercontract.org/shoppingCart');

            expect(request.request.method).toEqual('GET');

            request.flush(shoppingCart);

            httpController.verify();
        });
    });

    describe('updateShoppingCartItemQuantity', () => {
        it('submits the quantity update for the shopping cart item to the backend', () => {
            const quantityUpdate: QuantityUpdate = {
                quantity: 2
            };

            shoppingCartService
                .updateShoppingCartItemQuantity(
                    shoppingCartItem,
                    quantityUpdate
                )
                .subscribe(returnedShoppingCart => {
                    expect(returnedShoppingCart).toBe(shoppingCart);
                });

            const patchRequest = httpController.expectOne(getUri(shoppingCartItem));

            expect(patchRequest.request.method).toEqual('PATCH');
            expect(patchRequest.request.body).toEqual(quantityUpdate);

            patchRequest.flush(shoppingCart);

            httpController.verify();
        });
    });

    describe('deleteShoppingCartItem', () => {
        it('submits the deletion of the shopping cart item from the shopping cart to the backend', () => {
            shoppingCartService
                .deleteShoppingCartItem(shoppingCartItem)
                .subscribe(returnedShoppingCart => {
                    expect(returnedShoppingCart).toBe(shoppingCart);
                });

            const deleteRequest = httpController.expectOne(getUri(shoppingCartItem));

            expect(deleteRequest.request.method).toEqual('DELETE');

            deleteRequest.flush(shoppingCart);

            httpController.verify();
        });
    });

    describe('addToShoppingCart', () => {
        it('submits the given addition to the shopping cart to the backend', () => {
            shoppingCartService
                .addToShoppingCart(additionToShoppingCart)
                .subscribe(returnedShoppingCart => {
                    expect(returnedShoppingCart).toBe(shoppingCart);
                });

            const postRequest = httpController.expectOne('https://example.hypercontract.org/shoppingCart/items');

            expect(postRequest.request.method).toEqual('POST');
            expect(postRequest.request.body).toEqual(additionToShoppingCart);

            postRequest.flush(shoppingCart);

            httpController.verify();
        });
    });
});
