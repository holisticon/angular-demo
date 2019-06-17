import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { provideStoreServiceMock } from '@ngxp/store-service/testing';
import { AddressComponent, PaymentOptionComponent, UserProfileCommonStore } from '@ngxp/user-profile-common';
import { userProfile } from '@ngxp/user-profile-common/test';
import { UserProfileComponent } from './user-profile.component';

describe('UserProfileComponent', () => {
    let component: UserProfileComponent;
    let fixture: ComponentFixture<UserProfileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({}, {
                    runtimeChecks: {
                        strictStateImmutability: true,
                        strictActionImmutability: true
                    }
                }),
            ],
            declarations: [
                UserProfileComponent,
                AddressComponent,
                PaymentOptionComponent
            ],
            providers: [
                provideStoreServiceMock(UserProfileCommonStore, {
                    getAddresses: userProfile.addresses,
                    getPaymentOptions: userProfile.paymentOptions
                })
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
        expect(fixture.debugElement.queryAll(By.directive(AddressComponent)).length).toBe(userProfile.addresses.length);
    });

    it('renders a ngxp-payment-option for each payment option', () => {
        expect(fixture.debugElement.queryAll(By.directive(PaymentOptionComponent)).length).toBe(userProfile.paymentOptions.length);
    });
});
