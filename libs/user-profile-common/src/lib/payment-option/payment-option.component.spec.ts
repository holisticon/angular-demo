import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { PaymentOption } from '@ngxp/user-profile-common';
import { PaymentOptionComponent } from './payment-option.component';
import { paymentOption } from '@ngxp/user-profile-common/test';

describe('PaymentOptionComponent', () => {
    let component: PaymentOptionComponent;
    let fixture: ComponentFixture<PaymentOptionComponent>;

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
