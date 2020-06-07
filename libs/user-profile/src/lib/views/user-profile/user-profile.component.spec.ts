import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideStoreServiceMock } from '@ngxp/store-service/testing';
import { userProfile } from '@ngxp/user-profile/test';
import { UserProfileStore } from '../../state';
import { UserProfileComponent } from './user-profile.component';

describe('UserProfileComponent', () => {
    let component: UserProfileComponent;
    let fixture: ComponentFixture<UserProfileComponent>;

    beforeEach(async(() => {
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
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('renders a ngxp-address for each address', () => {
        expect(fixture.debugElement.queryAll(By.css('ngxp-address')).length).toBe(userProfile.addresses.length);
    });

    it('renders a ngxp-payment-option for each payment option', () => {
        expect(fixture.debugElement.queryAll(By.css('ngxp-payment-option')).length).toBe(userProfile.paymentOptions.length);
    });
});
