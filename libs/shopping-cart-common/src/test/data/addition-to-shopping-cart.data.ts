import { Blueprint, createBlueprintBuilder, BlueprintFactory } from '@ngx-patterns/builder';
import * as faker from 'faker';
import { repeat } from "rxjs/operators";
import { random, times, isUndefined } from "lodash-es";
import { createResourceBlueprintBuilder } from "@ngxp/common/test";
import { Resource, getId } from "@ngxp/common";
import { AdditionToShoppingCart } from '@ngxp/shopping-cart-common';
import { productBuilder } from '@ngxp/products-common/test';

const minItemQty = 1;
const maxItemQty = 5;

const additionToShoppingCartBlueprintFactory: Blueprint<AdditionToShoppingCart> = {
    product: () => getId(productBuilder().build()),
    quantity: () => random(minItemQty, maxItemQty)
};
export const additionToShoppingCartBuilder = createResourceBlueprintBuilder(additionToShoppingCartBlueprintFactory);

export const additionToShoppingCart: Resource<AdditionToShoppingCart> = additionToShoppingCartBuilder().freeze().build();
