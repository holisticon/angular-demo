import { resourceUri } from '@holisticon/resource/test';
import { Blueprint, createBlueprintBuilder } from '@ngxp/builder';
import { random } from 'lodash-es';
import { AdditionToShoppingCart } from '../../lib/domain/shopping-cart';

const minItemQty = 1;
const maxItemQty = 5;

const additionToShoppingCartBlueprintFactory: Blueprint<AdditionToShoppingCart> = {
    product: () => resourceUri,
    quantity: () => random(minItemQty, maxItemQty)
};
export const additionToShoppingCartBuilder = createBlueprintBuilder(additionToShoppingCartBlueprintFactory);

export const additionToShoppingCart: AdditionToShoppingCart = additionToShoppingCartBuilder().freeze().build();
