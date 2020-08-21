import { Address } from './address';
import { PaymentOption } from './payment-option';

export interface UserProfile {
    addresses: Address[];
    paymentOptions: PaymentOption[]
}
