import { Blueprint } from '@ngxp/builder';
import { Resource } from '@ngxp/resource';
import { createResourceBlueprintBuilder } from '@ngxp/resource/test';
import { PaymentOption } from '@ngxp/user-profile-common';
import * as faker from 'faker';

const paymentOptionBlueprint: Blueprint<PaymentOption> = {
    accountOwner: () => faker.name.findName(),
    iban: () => faker.finance.iban(),
    bic: () => faker.finance.bic()
};
export const paymentOptionBuilder = createResourceBlueprintBuilder(paymentOptionBlueprint);

export const paymentOption: Resource<PaymentOption> = paymentOptionBuilder().freeze().build();
export const paymentOptions: Resource<PaymentOption>[] = paymentOptionBuilder().freeze().buildMany(5);
