import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { addAddressAction, addPaymentOptionAction, addressesUpdatedAction, loadUserProfileAction, paymentOptionsUpdatedAction, removeAddressAction, removePaymentOptionAction, updateAddressAction, updatePaymentOptionAction, userProfileLoadedAction } from './user-profile.actions';
import { UserProfileService } from './user-profile.service';

@Injectable()
export class UserProfileEffects {

    loadUserProfile$ = createEffect(
        () => this.actions$.pipe(
            ofType(loadUserProfileAction),
            switchMap(() => this.userProfileService
                .loadUserProfile()
                .pipe(map(userProfile => userProfileLoadedAction({ userProfile }))))
        )
    )

    addAddress$ = createEffect(
        () => this.actions$.pipe(
            ofType(addAddressAction),
            switchMap(({ newAddress }) => this.userProfileService
                .addAddress(newAddress)
                .pipe(map(addresses => addressesUpdatedAction({ addresses }))))
        )
    )
    updateAddress$ = createEffect(
        () => this.actions$.pipe(
            ofType(updateAddressAction),
            switchMap(({ addressUpdate }) => this.userProfileService
                .updateAddress(addressUpdate.resource, addressUpdate.with)
                .pipe(map(addresses => addressesUpdatedAction({ addresses }))))
        )
    )
    removeAddress$ = createEffect(
        () => this.actions$.pipe(
            ofType(removeAddressAction),
            switchMap(({ address }) => this.userProfileService
                .removeAddress(address)
                .pipe(map(addresses => addressesUpdatedAction({ addresses }))))
        )
    )
    addPaymentOption$ = createEffect(
        () => this.actions$.pipe(
            ofType(addPaymentOptionAction),
            switchMap(({ newPaymentOption }) => this.userProfileService
                .addPaymentOption(newPaymentOption)
                .pipe(map(paymentOptions => paymentOptionsUpdatedAction({ paymentOptions }))))
        )
    )
    updatePaymentOption$ = createEffect(
        () => this.actions$.pipe(
            ofType(updatePaymentOptionAction),
            switchMap(({ paymentOptionUpdate }) => this.userProfileService
                .updatePaymentOption(paymentOptionUpdate.resource, paymentOptionUpdate.with)
                .pipe(map(paymentOptions => paymentOptionsUpdatedAction({ paymentOptions }))))
        )
    )
    removePaymentOption$ = createEffect(
        () => this.actions$.pipe(
            ofType(removePaymentOptionAction),
            switchMap(({ paymentOption }) => this.userProfileService
                .removePaymentOption(paymentOption)
                .pipe(map(paymentOptions => paymentOptionsUpdatedAction({ paymentOptions }))))
        )
    )

    constructor(
        private actions$: Actions,
        private userProfileService: UserProfileService
    ) { }
}
