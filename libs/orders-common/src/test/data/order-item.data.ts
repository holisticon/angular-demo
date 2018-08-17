import { productBuilder, products } from '@ngxp/products-common/test';
import { Blueprint, createBlueprintBuilder, BlueprintBuilder, BlueprintFactory, createBuilder } from '@ngx-patterns/builder';
import * as faker from 'faker';
import { Product } from '@ngxp/products-common';
import { isUndefined, random, sample } from 'lodash-es';
import { getId, LineItem, Resource } from '@ngxp/common';
import { createResourceBlueprintBuilder } from '@ngxp/common/test';

const minItemQty = 1;
const maxItemQty = 5;

const orderItemBlueprintFactory: BlueprintFactory<LineItem> = () => {
    const product = productBuilder().freeze().build();
    return {
        name: () => product.name,
        description: () => product.description,
        price: () => product.price,
        product: () => getId(product),
        quantity: () => random(minItemQty, maxItemQty)
    };
};
export const orderItemBuilder = createResourceBlueprintBuilder(orderItemBlueprintFactory);

export const orderItem: Resource<LineItem> = orderItemBuilder().freeze().build();
