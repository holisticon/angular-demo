import { Resource } from "@holisticon/resource"

export type UserProfile = Resource<{
    addresses: Address[];
    paymentOptions: PaymentOption[]
}>

export type Address = Resource<{
    name: string;
    street: string;
    zipCode: string;
    city: string;
    country: string;
}>

export type PaymentOption = Resource<{
    accountOwner: string;
    iban: string;
    bic: string;
}>
