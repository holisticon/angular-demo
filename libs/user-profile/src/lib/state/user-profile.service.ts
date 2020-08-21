import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getUri, Resource } from '@ngxp/resource';
import { UserProfile } from '../domain';
import { Address, AddressUpdate, NewAddress } from '../domain/address';
import { NewPaymentOption, PaymentOption, PaymentOptionUpdate } from '../domain/payment-option';

@Injectable({
    providedIn: 'root'
})
export class UserProfileService {

    constructor(
        private httpClient: HttpClient
    ) { }

    loadUserProfile() {
        return this.httpClient
            .get<Resource<UserProfile>>('https://example.hypercontract.org/userProfile');
    }

    addAddress(newAddress: NewAddress) {
        return this.httpClient
            .post<Resource<Address>[]>('https://example.hypercontract.org/userProfile/addresses', newAddress);
    }

    updateAddress(address: Resource<Address>, addressUpdate: AddressUpdate) {
        return this.httpClient
            .put<Resource<Address>[]>(getUri(address), addressUpdate);
    }

    removeAddress(address: Resource<Address>) {
        return this.httpClient
            .delete<Resource<Address>[]>(getUri(address));
    }

    addPaymentOption(newPaymentOption: NewPaymentOption) {
        return this.httpClient
            .post<Resource<PaymentOption>[]>('https://example.hypercontract.org/userProfile/paymentOptions', newPaymentOption);
    }

    updatePaymentOption(paymentOption: Resource<PaymentOption>, paymentOptionUpdate: PaymentOptionUpdate) {
        return this.httpClient
            .put<Resource<PaymentOption>[]>(getUri(paymentOption), paymentOptionUpdate);
    }

    removePaymentOption(paymentOption: Resource<PaymentOption>) {
        return this.httpClient
            .delete<Resource<PaymentOption>[]>(getUri(paymentOption));
    }
}
