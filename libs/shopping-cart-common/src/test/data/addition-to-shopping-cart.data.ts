import { Blueprint } from '@ngxp/builder';
import { productBuilder } from '@ngxp/products-common/test';
import { getUri, Resource } from '@ngxp/resource';
import { createResourceBlueprintBuilder } from '@ngxp/resource/test';
import { AdditionToShoppingCart } from '@ngxp/shopping-cart-common';
import { random } from 'lodash-es';

const minItemQty = 1;
const maxItemQty = 5;

const additionToShoppingCartBlueprintFactory: Blueprint<AdditionToShoppingCart> = {
    product: () => getUri(productBuilder().build()),
    quantity: () => random(minItemQty, maxItemQty)
};
export const additionToShoppingCartBuilder = createResourceBlueprintBuilder(additionToShoppingCartBlueprintFactory);

export const additionToShoppingCart: Resource<AdditionToShoppingCart> = additionToShoppingCartBuilder().freeze().build();
