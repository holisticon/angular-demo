import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { address, addresses, addressUpdate, newAddress, userProfile } from '@ngxp/user-profile/test';
import { hot } from 'jest-marbles';
import { Observable, of as observableOf } from 'rxjs';
import { addAddressAction, addressesUpdatedAction, loadUserProfileAction, removeAddressAction, updateAddressAction, userProfileLoadedAction } from './user-profile.actions';
import { UserProfileEffects } from './user-profile.effects';
import { UserProfileService } from './user-profile.service';

describe('UserProfileEffects', () => {
    let actions$: Observable<any>;
    let effects$: UserProfileEffects;
    let userProfileService: UserProfileService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule
            ],
            providers: [
                UserProfileEffects,
                UserProfileService,
                provideMockActions(() => actions$)
            ]
        });

        effects$ = TestBed.inject(UserProfileEffects);
        userProfileService = TestBed.inject(UserProfileService);
    });

    describe('loadUserProfile$', () => {
        it('dispatches a UserProfileLoadedAction with the user profile returned by the service', () => {
            spyOn(userProfileService, 'loadUserProfile').and.returnValue(observableOf(userProfile));

            actions$ = hot('-a-|', { a: loadUserProfileAction() });

            expect(effects$.loadUserProfile$).toBeObservable(
                hot('-a-|', { a: userProfileLoadedAction({ userProfile }) })
            );
        });
    });

    describe('addAddress$', () => {
        it('adds the address using the AddressService', () => {
            spyOn(userProfileService, 'addAddress').and.returnValue(observableOf(addresses));

            actions$ = hot('-a-|', { a: addAddressAction({ newAddress }) });

            expect(effects$.addAddress$).toBeObservable(
                hot('-a-|', { a: addressesUpdatedAction({ addresses }) })
            );
        });
    });

    describe('updateAddress$', () => {
        it('updates the address using the AddressService', () => {
            spyOn(userProfileService, 'updateAddress').and.returnValue(observableOf(addresses));

            actions$ = hot('-a-|', {
                a: updateAddressAction({
                    addressUpdate: {
                        resource: address,
                        with: addressUpdate
                    }
                })
            });

            expect(effects$.updateAddress$).toBeObservable(
                hot('-a-|', { a: addressesUpdatedAction({ addresses }) })
            );
        });
    });

    describe('removeAddress$', () => {
        it('removes the address using the AddressService', () => {
            spyOn(userProfileService, 'removeAddress').and.returnValue(observableOf(addresses));

            actions$ = hot('-a-|', {
                a: removeAddressAction({ address })
            });

            expect(effects$.removeAddress$).toBeObservable(
                hot('-a-|', { a: addressesUpdatedAction({ addresses }) })
            );
        });
    });
});
