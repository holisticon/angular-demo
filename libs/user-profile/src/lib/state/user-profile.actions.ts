import { createAction, props } from '@ngrx/store';
import { Resource, ResourceWith } from '@ngxp/resource';
import { PaymentOption, UserProfile } from '../domain';
import { Address, AddressUpdate, NewAddress } from '../domain/address';
import { NewPaymentOption, PaymentOptionUpdate } from '../domain/payment-option';

export const loadUserProfileAction = createAction(
    '[UserProfile] load user profile'
);

export const userProfileLoadedAction = createAction(
    '[UserProfile] user profile Loaded',
    props<{ userProfile: UserProfile }>()
);

export const addAddressAction = createAction(
    '[UserProfile] add address',
    props<{ newAddress: NewAddress }>()
);

export const updateAddressAction = createAction(
    '[UserProfile] update address',
    props<{ addressUpdate: ResourceWith<AddressUpdate> }>()
);

export const removeAddressAction = createAction(
    '[UserProfile] remove address',
    props<{ address: Resource<Address> }>()
);

export const addressesUpdatedAction = createAction(
    '[UserProfile] addresses updated',
    props<{ addresses: Address[] }>()
);

export const addPaymentOptionAction = createAction(
    '[UserProfile] add payment option',
    props<{ newPaymentOption: NewPaymentOption }>()
);

export const updatePaymentOptionAction = createAction(
    '[UserProfile] update payment option',
    props<{ paymentOptionUpdate: ResourceWith<PaymentOptionUpdate> }>()
);

export const removePaymentOptionAction = createAction(
    '[UserProfile] remove payment option',
    props<{ paymentOption: Resource<PaymentOption> }>()
);

export const paymentOptionsUpdatedAction = createAction(
    '[UserProfile] payment options updated',
    props<{ paymentOptions: PaymentOption[] }>()
);
