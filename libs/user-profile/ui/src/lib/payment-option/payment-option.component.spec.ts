import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { paymentOption } from '@ngxp/user-profile/domain/test';
import { PaymentOptionComponent } from './payment-option.component';

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
