// tslint:disable: no-non-null-assertion

import { BlueprintFactory } from '@ngxp/builder';
import { Resource } from '@ngxp/resource';
import { createResourceBlueprintBuilder } from '@ngxp/resource/test';
import { userProfile } from '@ngxp/user-profile/test';
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
