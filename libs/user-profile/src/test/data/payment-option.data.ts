import { Resource } from '@holisticon/resource';
import { createResourceBlueprintBuilder } from '@holisticon/resource/test';
import { Blueprint } from '@ngxp/builder';
import { finance, name } from 'faker';
import { PaymentOption } from '../../lib/domain/user-profile';

const paymentOptionBlueprint: Blueprint<PaymentOption> = {
    accountOwner: () => name.findName(),
    iban: () => finance.iban(),
    bic: () => finance.bic()
};
export const paymentOptionBuilder = createResourceBlueprintBuilder(paymentOptionBlueprint);

export const paymentOption: Resource<PaymentOption> = paymentOptionBuilder().freeze().build();
export const paymentOptions: Resource<PaymentOption>[] = paymentOptionBuilder().freeze().buildMany(5);
