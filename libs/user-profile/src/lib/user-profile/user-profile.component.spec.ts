import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AddressComponent, PaymentOptionComponent, UserProfile } from '@luchsamapparat/user-profile-common';
import { StoreModule } from '@ngrx/store';
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
                // TODO: replace with UserStore mock
                StoreModule.forRoot<any>({
                    userProfile: state => state
                }, {
                    initialState: {
                        userProfile: { userProfile }
                    }
                }),
            ],
            declarations: [
                UserProfileComponent,
                AddressComponent,
                PaymentOptionComponent
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
        expect(fixture.debugElement.queryAll(By.directive(AddressComponent))).toHaveLength(userProfile.addresses.length);
    });

    it('renders a cfha-payment-option for each payment option', () => {
        expect(fixture.debugElement.queryAll(By.directive(PaymentOptionComponent))).toHaveLength(userProfile.paymentOptions.length);
    });
});
