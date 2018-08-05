import { productBuilder, products } from '@luchsamapparat/products-common/test';
import { Blueprint, createBlueprintBuilder, BlueprintBuilder, BlueprintFactory, createBuilder } from '@ngx-patterns/builder';
import * as faker from 'faker';
import { Product } from '@luchsamapparat/products-common';
import { isUndefined, random, sample } from 'lodash-es';
import { getId, LineItem, Resource } from '@luchsamapparat/common';
import { createResourceBlueprintBuilder } from '@luchsamapparat/common/test';

const minItemQty = 1;
const maxItemQty = 5;

const shoppingCartItemBlueprintFactory: BlueprintFactory<LineItem> = () => {
    const product = productBuilder().build();
    return {
        name: () => product.name,
        description: () => product.description,
        price: () => product.price,
        product: () => getId(product),
        quantity: () => random(minItemQty, maxItemQty)
    };
};
export const shoppingCartItemBuilder = createResourceBlueprintBuilder(shoppingCartItemBlueprintFactory);

export const shoppingCartItem: Resource<LineItem> = shoppingCartItemBuilder().build();
