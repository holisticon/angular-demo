import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { addId, getId } from '@luchsamapparat/common';
import { QuantityUpdate, ShoppingCart } from '@luchsamapparat/shopping-cart-common';
import { ShoppingCartService } from './shopping-cart.service';

describe('ShoppingCartService', () => {
    let shoppingCartService: ShoppingCartService;
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
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                ShoppingCartService
            ]
        });

        shoppingCartService = TestBed.get(ShoppingCartService);
        httpController = TestBed.get(HttpTestingController);
    });

    describe('loadShoppingCart', () => {
        it('loads the shopping cart from the backend', () => {
            shoppingCartService
                .loadShoppingCart()
                .subscribe(returnedShoppingCart => {
                    expect(returnedShoppingCart).toBe(shoppingCart);
                });

            const request = httpController.expectOne(`http://hypercontract.herokuapp.com/shoppingCart`);

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

            const patchRequest = httpController.expectOne(
                `http://hypercontract.herokuapp.com/shoppingCart/items/${getId(shoppingCartItem)}`
            );

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

            const deleteRequest = httpController.expectOne(
                `http://hypercontract.herokuapp.com/shoppingCart/items/${getId(shoppingCartItem)}`
            );

            expect(deleteRequest.request.method).toEqual('DELETE');

            deleteRequest.flush(shoppingCart);

            httpController.verify();
        });
    });
});
