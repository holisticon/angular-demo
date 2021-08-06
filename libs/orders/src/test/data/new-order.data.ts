import { Resource } from '@holisticon/resource';
import { createResourceBlueprintBuilder } from '@holisticon/resource/test';
import { Address, PaymentOption } from '@holisticon/user-profile';
import { userProfile } from '@holisticon/user-profile/test';
import { BlueprintFactory } from '@ngxp/builder';
import { sample } from 'lodash-es';
import { NewOrder } from '../../lib/domain/order';
import { orderItemBuilder } from './order-item.data';

const newOrderBlueprint: BlueprintFactory<NewOrder> = () => {
    return {
        billingAddress: () => sample(userProfile.addresses) as Address,
        shippingAddress: () => sample(userProfile.addresses) as Address,
        orderItems: () => orderItemBuilder().buildMany(10),
        payment: () => sample(userProfile.paymentOptions) as PaymentOption
    };
};

export const newOrderBuilder = createResourceBlueprintBuilder(newOrderBlueprint);

export const newOrder: Resource<NewOrder> = newOrderBuilder().freeze().build();
export const newOrders: Resource<NewOrder>[] = newOrderBuilder().freeze().buildMany(20);
