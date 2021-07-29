import { Resource } from '@holisticon/resource';
import { createResourceBlueprintBuilder } from '@holisticon/resource/test';
import { BlueprintFactory } from '@ngxp/builder';
import { random } from 'lodash-es';
import { ShoppingCart } from '../../lib/domain/shopping-cart';
import { shoppingCartItemBuilder } from './shopping-cart-item.data';

const minItemCount = 1;
const maxItemCount = 3;

const shoppingCartBlueprintFactory: BlueprintFactory<ShoppingCart> = () => {
    const items = shoppingCartItemBuilder().freeze().buildMany(random(minItemCount, maxItemCount));

    const totalPrice = items.reduce(
        (total, item) => total + (item.price * item.quantity),
        0
    );

    return {
        items: () => items,
        totalPrice: () => totalPrice
    };
};
export const shoppingCartBuilder = createResourceBlueprintBuilder(shoppingCartBlueprintFactory);

export const shoppingCart: Resource<ShoppingCart> = shoppingCartBuilder().freeze().build();
export const emptyShoppingCart: Resource<ShoppingCart> = shoppingCartBuilder()
    .items([])
    .totalPrice(0)
    .freeze().build();
