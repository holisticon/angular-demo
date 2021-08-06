import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { userProfile } from '@holisticon/user-profile/test';
import { provideStoreServiceMock } from '@ngxp/store-service/testing';
import { UserProfileStore } from '../../state';
import { UserProfileComponent } from './user-profile.component';

describe('UserProfileComponent', () => {
    let fixture: ComponentFixture<UserProfileComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                UserProfileComponent
            ],
            providers: [
                provideStoreServiceMock(UserProfileStore, {
                    getAddresses: userProfile.addresses,
                    getPaymentOptions: userProfile.paymentOptions
                })
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserProfileComponent);
        fixture.detectChanges();
    });

    it('renders a holisticon-address for each address', () => {
        expect(fixture.debugElement.queryAll(By.css('holisticon-address')).length).toBe(userProfile.addresses.length);
    });

    it('renders a holisticon-payment-option for each payment option', () => {
        expect(fixture.debugElement.queryAll(By.css('holisticon-payment-option')).length).toBe(userProfile.paymentOptions.length);
    });
});
