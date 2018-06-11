import { addId, getId } from "@luchsamapparat/common";
import { toNewOrderRequest } from "./new-order-request.mapper";
import { NewOrder } from "./order.model";

describe('toNewOrderRequest', () => {
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

    it('maps the given new order to an order request', () => {
        // kind of useless 🤔 ... for now 😏
        expect(toNewOrderRequest(newOrder)).toEqual({
            items: newOrder.shoppingCart.items
                .map(shoppingCartItem => getId(shoppingCartItem)),
            payment: getId(newOrder.payment),
            shippingAddress: getId(newOrder.shippingAddress),
            billingAddress: getId(newOrder.billingAddress)
        })
    });

});
