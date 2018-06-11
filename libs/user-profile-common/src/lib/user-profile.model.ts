export interface UserProfile {
    addresses: Address[];
    paymentOptions: PaymentOption[]
}

export interface Address {
    name: string;
    street: string;
    zipCode: string;
    city: string;
    country: string;
}

export interface PaymentOption {
    accountOwner: string;
    iban: string;
    bic: string;
}
