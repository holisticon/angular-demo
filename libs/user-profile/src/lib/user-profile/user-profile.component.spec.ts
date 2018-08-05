import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AddressComponent, PaymentOptionComponent, UserProfile, UserProfileCommonStore } from '@luchsamapparat/user-profile-common';
import { StoreModule } from '@ngrx/store';
import { of as observableOf } from 'rxjs';
import { UserProfileComponent } from './user-profile.component';
import { provideStoreServiceMock, StoreServiceMock } from '@ngx-patterns/store-service/testing';

describe('UserProfileComponent', () => {
    let component: UserProfileComponent;
    let fixture: ComponentFixture<UserProfileComponent>;

    const userProfile: UserProfile = {
        addresses: [{
            city: '',
            country: '',
            name: '',
            street: '',
            zipCode: ''
        }],
        paymentOptions: [{
            accountOwner: '',
            bic: '',
            iban: ''
        }]
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({})
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

    it('renders a cfha-address for each address', () => {
        expect(fixture.debugElement.queryAll(By.directive(AddressComponent)).length).toBe(userProfile.addresses.length);
    });

    it('renders a cfha-payment-option for each payment option', () => {
        expect(fixture.debugElement.queryAll(By.directive(PaymentOptionComponent)).length).toBe(userProfile.paymentOptions.length);
    });
});
