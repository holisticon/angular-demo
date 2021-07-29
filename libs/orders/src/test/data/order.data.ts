import { getRandomValue } from '@holisticon/common/test';
import { Resource } from '@holisticon/resource';
import { createResourceBlueprintBuilder } from '@holisticon/resource/test';
import { addressBuilder, paymentOptionBuilder } from '@holisticon/user-profile/test';
import { BlueprintFactory } from '@ngxp/builder';
import { date } from 'faker';
import { random } from 'lodash-es';
import { Order, OrderHistory, OrderStatus } from '../../lib/domain/order';
import { orderItemBuilder } from './order-item.data';

const minItemCount = 1;
const maxItemCount = 3;

const orderBlueprint: BlueprintFactory<Order> = () => {
    const items = orderItemBuilder().freeze().buildMany(random(minItemCount, maxItemCount));
    return {
        billingAddress: () => addressBuilder().build(),
        orderDate: () => date.past().toISOString(),
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
