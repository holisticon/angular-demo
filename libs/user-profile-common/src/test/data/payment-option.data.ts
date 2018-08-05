import { Blueprint, createBlueprintBuilder } from '@ngx-patterns/builder';
import * as faker from 'faker';
import { PaymentOption } from '@luchsamapparat/user-profile-common';
import { Resource } from '@luchsamapparat/common';
import { createResourceBlueprintBuilder } from '@luchsamapparat/common/test';

const paymentOptionBlueprint: Blueprint<PaymentOption> = {
    accountOwner: () => faker.name.findName(),
    iban: () => faker.finance.iban(),
    bic: () => faker.finance.bic()
};
export const paymentOptionBuilder = createResourceBlueprintBuilder(paymentOptionBlueprint);

export const paymentOption: Resource<PaymentOption> = paymentOptionBuilder().build();
export const paymentOptions: Resource<PaymentOption>[] = paymentOptionBuilder().buildMany(5);
