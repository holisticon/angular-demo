import { Blueprint, createBlueprintBuilder } from '@ngxp/builder';
import { Resource } from '@ngxp/resource';
import { createResourceBlueprintBuilder } from '@ngxp/resource/test';
import { finance, name } from 'faker';
import { PaymentOption } from '../../lib/domain';
import { NewPaymentOption, PaymentOptionUpdate } from '../../lib/domain/payment-option';

const paymentOptionBlueprint: Blueprint<PaymentOption> = {
    accountOwner: () => name.findName(),
    iban: () => finance.iban(),
    bic: () => finance.bic()
};
export const paymentOptionBuilder = createResourceBlueprintBuilder(paymentOptionBlueprint);

export const paymentOption: Resource<PaymentOption> = paymentOptionBuilder().freeze().build();
export const paymentOptions: Resource<PaymentOption>[] = paymentOptionBuilder().freeze().buildMany(5);

const newPaymentOptionBuilder = createBlueprintBuilder(paymentOptionBlueprint);
export const newPaymentOption: NewPaymentOption = newPaymentOptionBuilder().freeze().build();

const paymentOptionUpdateBuilder = createBlueprintBuilder(paymentOptionBlueprint);
export const paymentOptionUpdate: PaymentOptionUpdate = paymentOptionUpdateBuilder().freeze().build();
