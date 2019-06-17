// tslint:disable: no-non-null-assertion

import { BlueprintFactory } from '@ngxp/builder';
import { Resource } from '@ngxp/common';
import { createResourceBlueprintBuilder } from '@ngxp/common/test';
import { NewOrder } from '@ngxp/orders-common';
import { shoppingCartBuilder } from '@ngxp/shopping-cart-common/test';
import { userProfile } from '@ngxp/user-profile-common/test';
import { sample } from 'lodash-es';

const newOrderBlueprint: BlueprintFactory<NewOrder> = () => {
    return {
        billingAddress: () => sample(userProfile.addresses)!,
        shippingAddress: () => sample(userProfile.addresses)!,
        shoppingCart: () => shoppingCartBuilder().build(),
        payment: () => sample(userProfile.paymentOptions)!
    };
};

export const newOrderBuilder = createResourceBlueprintBuilder(newOrderBlueprint);

export const newOrder: Resource<NewOrder> = newOrderBuilder().freeze().build();
export const newOrders: Resource<NewOrder>[] = newOrderBuilder().freeze().buildMany(20);
