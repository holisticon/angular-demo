import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { getUri } from '@ngxp/resource';
import { address, addresses, addressUpdate, newAddress, newPaymentOption, paymentOption, paymentOptions, paymentOptionUpdate, userProfile } from '@ngxp/user-profile/test';
import { UserProfileService } from './user-profile.service';

describe('UserProfileService', () => {
    let userProfileService: UserProfileService;
    let httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                UserProfileService
            ]
        });

        userProfileService = TestBed.inject(UserProfileService);
        httpController = TestBed.inject(HttpTestingController);
    });

    describe('loadUserProfile', () => {
        it('loads the user profile from the backend', () => {
            userProfileService.loadUserProfile()
                .subscribe(returnedUserProfile => {
                    expect(returnedUserProfile).toBe(userProfile);
                });

            const request = httpController.expectOne('https://example.hypercontract.org/userProfile');

            expect(request.request.method).toEqual('GET');

            request.flush(userProfile);

            httpController.verify();
        });
    });

    describe('addAddress', () => {
        it('creates the given address', () => {
            userProfileService.addAddress(newAddress)
                .subscribe(returnedAddresses => {
                    expect(returnedAddresses).toBe(addresses);
                });

            const request = httpController.expectOne('https://example.hypercontract.org/userProfile/addresses');

            expect(request.request.method).toEqual('POST');
            expect(request.request.body).toEqual(newAddress);

            request.flush(addresses);

            httpController.verify();
        });
    });

    describe('updateAddress', () => {
        it('submits the given address', () => {
            userProfileService.updateAddress(address, addressUpdate)
                .subscribe(returnedAddresses => {
                    expect(returnedAddresses).toBe(addresses);
                });

            const request = httpController.expectOne(getUri(address));

            expect(request.request.method).toEqual('PUT');
            expect(request.request.body).toEqual(addressUpdate);

            request.flush(addresses);

            httpController.verify();
        });
    });

    describe('removeAddress', () => {
        it('removes the given address', () => {
            userProfileService.removeAddress(address)
                .subscribe(returnedAddresses => {
                    expect(returnedAddresses).toBe(addresses);
                });

            const request = httpController.expectOne(getUri(address));

            expect(request.request.method).toEqual('DELETE');

            request.flush(addresses);

            httpController.verify();
        });
    });

    describe('addPaymentOption', () => {
        it('creates the given payment option', () => {
            userProfileService.addPaymentOption(newPaymentOption)
                .subscribe(returnedPaymentOptiones => {
                    expect(returnedPaymentOptiones).toBe(paymentOptions);
                });

            const request = httpController.expectOne('https://example.hypercontract.org/userProfile/paymentOptions');

            expect(request.request.method).toEqual('POST');
            expect(request.request.body).toEqual(newPaymentOption);

            request.flush(paymentOptions);

            httpController.verify();
        });
    });

    describe('updatePaymentOption', () => {
        it('submits the given payment option', () => {
            userProfileService.updatePaymentOption(paymentOption, paymentOptionUpdate)
                .subscribe(returnedPaymentOptiones => {
                    expect(returnedPaymentOptiones).toBe(paymentOptions);
                });

            const request = httpController.expectOne(getUri(paymentOption));

            expect(request.request.method).toEqual('PUT');
            expect(request.request.body).toEqual(paymentOptionUpdate);

            request.flush(paymentOptions);

            httpController.verify();
        });
    });

    describe('removePaymentOption', () => {
        it('removes the given payment option', () => {
            userProfileService.removePaymentOption(paymentOption)
                .subscribe(returnedPaymentOptiones => {
                    expect(returnedPaymentOptiones).toBe(paymentOptions);
                });

            const request = httpController.expectOne(getUri(paymentOption));

            expect(request.request.method).toEqual('DELETE');

            request.flush(paymentOptions);

            httpController.verify();
        });
    });
});
