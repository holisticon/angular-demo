import { BlueprintFactory } from '@ngxp/builder';
import { productBuilder } from '@ngxp/products-common/test';
import { getId, Resource } from '@ngxp/resource';
import { createResourceBlueprintBuilder } from '@ngxp/resource/test';
import { ShoppingCartItem } from '@ngxp/shopping-cart-common';
import { random } from 'lodash-es';

const minItemQty = 1;
const maxItemQty = 5;

const shoppingCartItemBlueprintFactory: BlueprintFactory<ShoppingCartItem> = () => {
    const product = productBuilder().freeze().build();
    return {
        name: () => product.name,
        description: () => product.description,
        price: () => product.price,
        product: () => getId(product),
        quantity: () => random(minItemQty, maxItemQty)
    };
};
export const shoppingCartItemBuilder = createResourceBlueprintBuilder(shoppingCartItemBlueprintFactory);

export const shoppingCartItem: Resource<ShoppingCartItem> = shoppingCartItemBuilder().freeze().build();
