import { addressBuilder, paymentOptionBuilder, userProfile } from '@ngxp/user-profile-common/test';
import { Blueprint, createBlueprintBuilder, BlueprintFactory } from '@ngxp/builder';
import * as faker from 'faker';
import { random, sample } from 'lodash-es';
import { getRandomValue, createResourceBlueprintBuilder } from '@ngxp/common/test';
import { Resource } from '@ngxp/common';
import { NewOrder } from '@ngxp/orders-common';
import { shoppingCartBuilder } from '@ngxp/shopping-cart-common/test';

const minItemCount = 1;
const maxItemCount = 3;

const newOrderBlueprint: BlueprintFactory<NewOrder> = () => {
    return {
        billingAddress: () => sample(userProfile.addresses),
        shippingAddress: () => sample(userProfile.addresses),
        shoppingCart: () => shoppingCartBuilder().build(),
        payment: () => sample(userProfile.paymentOptions)
    };
};

export const newOrderBuilder = createResourceBlueprintBuilder(newOrderBlueprint);

export const newOrder: Resource<NewOrder> = newOrderBuilder().freeze().build();
export const newOrders: Resource<NewOrder>[] = newOrderBuilder().freeze().buildMany(20);
