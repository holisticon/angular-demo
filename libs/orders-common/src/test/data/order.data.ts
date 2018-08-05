import { Order, OrderStatus } from "@luchsamapparat/orders-common";
import { addressBuilder, paymentOptionBuilder } from "@luchsamapparat/user-profile-common/test";
import { Blueprint, createBlueprintBuilder, BlueprintFactory } from '@ngx-patterns/builder';
import * as faker from 'faker';
import { random, sample } from "lodash-es";
import { getRandomValue, createResourceBlueprintBuilder } from "@luchsamapparat/common/test";
import { Resource } from "@luchsamapparat/common";
import { orderItemBuilder } from "./order-item.data";

const minItemCount = 1;
const maxItemCount = 3;

const orderBlueprint: BlueprintFactory<Order> = () => {
    const items = orderItemBuilder().buildMany(random(minItemCount, maxItemCount));
    return {
        billingAddress: () => addressBuilder().build(),
        date: () => faker.date.past().toISOString(),
        items: () => items,
        payment: () => paymentOptionBuilder().build(),
        shippingAddress: () => addressBuilder().build(),
        status: () => getRandomValue(OrderStatus)
    };
};

export const orderBuilder = createResourceBlueprintBuilder(orderBlueprint);

export const order: Resource<Order> = orderBuilder().build();
export const orders: Resource<Order>[] = orderBuilder().buildMany(20);