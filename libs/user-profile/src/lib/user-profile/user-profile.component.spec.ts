import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AddressComponent, PaymentOptionComponent, UserProfile, UserProfileStore } from '@luchsamapparat/user-profile-common';
import { StoreModule } from '@ngrx/store';
import { of as observableOf } from 'rxjs';
import { UserProfileComponent } from './user-profile.component';

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
            ]
        })
            .compileComponents();

        const userProfileStore = TestBed.get(UserProfileStore);
        jest.spyOn(userProfileStore, 'getAddresses').mockImplementation(() => observableOf(userProfile.addresses));
        jest.spyOn(userProfileStore, 'getPaymentOptions').mockImplementation(() => observableOf(userProfile.paymentOptions));
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('renders a cfha-address for each address', () => {
        expect(fixture.debugElement.queryAll(By.directive(AddressComponent))).toHaveLength(userProfile.addresses.length);
    });

    it('renders a cfha-payment-option for each payment option', () => {
        expect(fixture.debugElement.queryAll(By.directive(PaymentOptionComponent))).toHaveLength(userProfile.paymentOptions.length);
    });
});
