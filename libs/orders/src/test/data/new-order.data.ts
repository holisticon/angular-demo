// tslint:disable: no-non-null-assertion

import { Resource } from '@holisticon/resource';
import { createResourceBlueprintBuilder } from '@holisticon/resource/test';
import { userProfile } from '@holisticon/user-profile/test';
import { BlueprintFactory } from '@ngxp/builder';
import { sample } from 'lodash-es';
import { NewOrder } from '../../lib/domain/order';
import { orderItemBuilder } from './order-item.data';

const newOrderBlueprint: BlueprintFactory<NewOrder> = () => {
    return {
        billingAddress: () => sample(userProfile.addresses)!,
        shippingAddress: () => sample(userProfile.addresses)!,
        orderItems: () => orderItemBuilder().buildMany(10),
        payment: () => sample(userProfile.paymentOptions)!
    };
};

export const newOrderBuilder = createResourceBlueprintBuilder(newOrderBlueprint);

export const newOrder: Resource<NewOrder> = newOrderBuilder().freeze().build();
export const newOrders: Resource<NewOrder>[] = newOrderBuilder().freeze().buildMany(20);
