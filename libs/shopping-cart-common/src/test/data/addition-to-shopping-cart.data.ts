import { Blueprint, createBlueprintBuilder, BlueprintFactory } from '@ngx-patterns/builder';
import * as faker from 'faker';
import { repeat } from "rxjs/operators";
import { random, times, isUndefined } from "lodash-es";
import { createResourceBlueprintBuilder } from "@luchsamapparat/common/test";
import { Resource, getId } from "@luchsamapparat/common";
import { AdditionToShoppingCart } from '@luchsamapparat/shopping-cart-common';
import { productBuilder } from '@luchsamapparat/products-common/test';

const minItemQty = 1;
const maxItemQty = 5;

const additionToShoppingCartBlueprintFactory: Blueprint<AdditionToShoppingCart> = {
    product: () => getId(productBuilder().build()),
    quantity: () => random(minItemQty, maxItemQty)
};
export const additionToShoppingCartBuilder = createResourceBlueprintBuilder(additionToShoppingCartBlueprintFactory);

export const additionToShoppingCart: Resource<AdditionToShoppingCart> = additionToShoppingCartBuilder().build();
