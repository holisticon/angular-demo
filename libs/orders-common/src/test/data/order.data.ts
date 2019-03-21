import { Order, OrderStatus } from '@ngxp/orders-common';
import { addressBuilder, paymentOptionBuilder } from '@ngxp/user-profile-common/test';
import { Blueprint, createBlueprintBuilder, BlueprintFactory } from '@ngxp/builder';
import * as faker from 'faker';
import { random, sample } from 'lodash-es';
import { getRandomValue, createResourceBlueprintBuilder } from '@ngxp/common/test';
import { Resource } from '@ngxp/common';
import { orderItemBuilder } from './order-item.data';

const minItemCount = 1;
const maxItemCount = 3;

const orderBlueprint: BlueprintFactory<Order> = () => {
    const items = orderItemBuilder().freeze().buildMany(random(minItemCount, maxItemCount));
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

export const order: Resource<Order> = orderBuilder().freeze().build();
export const orders: Resource<Order>[] = orderBuilder().freeze().buildMany(20);
