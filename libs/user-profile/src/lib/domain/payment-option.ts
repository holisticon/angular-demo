export interface PaymentOption {
    accountOwner: string;
    iban: string;
    bic: string;
}

export interface NewPaymentOption extends PaymentOption { }
export interface PaymentOptionUpdate extends PaymentOption { }
