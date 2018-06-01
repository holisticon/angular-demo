import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { PaymentOption } from '@luchsamapparat/user-profile-common';
import { PaymentOptionComponent } from './payment-option.component';


describe('PaymentOptionComponent', () => {
    let component: PaymentOptionComponent;
    let fixture: ComponentFixture<PaymentOptionComponent>;

    const paymentOption: PaymentOption = {
        accountOwner: '',
        bic: '',
        iban: ''
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                PaymentOptionComponent
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PaymentOptionComponent);
        component = fixture.componentInstance;
        component.paymentOption = paymentOption;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
