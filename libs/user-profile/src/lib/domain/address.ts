export interface Address {
    name: string;
    street: string;
    zipCode: string;
    city: string;
    country: string;
}

export interface NewAddress extends Address { }
export interface AddressUpdate extends Address { }
