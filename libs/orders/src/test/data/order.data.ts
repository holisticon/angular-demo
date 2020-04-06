import { BlueprintFactory } from '@ngxp/builder';
import { getRandomValue } from '@ngxp/common/test';
import { Resource } from '@ngxp/resource';
import { createResourceBlueprintBuilder } from '@ngxp/resource/test';
import { addressBuilder, paymentOptionBuilder } from '@ngxp/user-profile/test';
import * as faker from 'faker';
import { random } from 'lodash-es';
import { Order, OrderHistory, OrderStatus } from '../../lib/order.model';
import { orderItemBuilder } from './order-item.data';

const minItemCount = 1;
const maxItemCount = 3;

const orderBlueprint: BlueprintFactory<Order> = () => {
    const items = orderItemBuilder().freeze().buildMany(random(minItemCount, maxItemCount));
    return {
        billingAddress: () => addressBuilder().build(),
        orderDate: () => faker.date.past().toISOString(),
        orderItems: () => items,
        payment: () => paymentOptionBuilder().build(),
        shippingAddress: () => addressBuilder().build(),
        orderStatus: () => getRandomValue(OrderStatus)
    };
};

export const orderBuilder = createResourceBlueprintBuilder(orderBlueprint);

export const order: Resource<Order> = orderBuilder().freeze().build();
export const orders: Resource<Order>[] = orderBuilder().freeze().buildMany(20);
export const orderHistory: OrderHistory = { orders };
