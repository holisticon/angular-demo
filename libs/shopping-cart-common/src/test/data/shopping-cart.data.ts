import { ShoppingCart, ShoppingCartItem } from "@luchsamapparat/shopping-cart-common";
import { Blueprint, createBlueprintBuilder, BlueprintFactory } from '@ngx-patterns/builder';
import * as faker from 'faker';
import { repeat } from "rxjs/operators";
import { random, times, isUndefined } from "lodash-es";
import { createResourceBlueprintBuilder } from "@luchsamapparat/common/test";
import { Resource } from "@luchsamapparat/common";
import { shoppingCartItemBuilder } from "./shopping-cart-item.data";

const minItemCount = 1;
const maxItemCount = 3;

const shoppingCartBlueprintFactory: BlueprintFactory<ShoppingCart> = () => {
    const items = shoppingCartItemBuilder().buildMany(random(minItemCount, maxItemCount));

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

export const shoppingCart: Resource<ShoppingCart> = shoppingCartBuilder().build();
export const emptyShoppingCart: Resource<ShoppingCart> = shoppingCartBuilder()
    .items([])
    .totalPrice(0)
    .build();
