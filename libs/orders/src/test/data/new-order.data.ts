// tslint:disable: no-non-null-assertion

import { BlueprintFactory } from '@ngxp/builder';
import { Resource } from '@ngxp/resource';
import { createResourceBlueprintBuilder } from '@ngxp/resource/test';
import { shoppingCartItemBuilder } from '@ngxp/shopping-cart/test';
import { userProfile } from '@ngxp/user-profile/test';
import { sample } from 'lodash-es';
import { NewOrder } from '../../lib/order.model';

const newOrderBlueprint: BlueprintFactory<NewOrder> = () => {
    return {
        billingAddress: () => sample(userProfile.addresses)!,
        shippingAddress: () => sample(userProfile.addresses)!,
        shoppingCartItems: () => shoppingCartItemBuilder().buildMany(10),
        payment: () => sample(userProfile.paymentOptions)!
    };
};

export const newOrderBuilder = createResourceBlueprintBuilder(newOrderBlueprint);

export const newOrder: Resource<NewOrder> = newOrderBuilder().freeze().build();
export const newOrders: Resource<NewOrder>[] = newOrderBuilder().freeze().buildMany(20);
