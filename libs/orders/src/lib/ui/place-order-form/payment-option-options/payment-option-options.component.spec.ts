import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { userProfile } from '@ngxp/user-profile/test';
import { last } from 'lodash-es';
import { PaymentOptionOptionsComponent } from './payment-option-options.component';


describe('PaymentOptionOptionsComponent', () => {
    let component: PaymentOptionOptionsComponent;
    let fixture: ComponentFixture<PaymentOptionOptionsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule
            ],
            declarations: [
                PaymentOptionOptionsComponent
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PaymentOptionOptionsComponent);
        component = fixture.componentInstance;
        component.paymentOptions = userProfile.paymentOptions
        fixture.detectChanges();
    });

    it('renders a radio button for each payment option', () => {
        const radioButtons = fixture.debugElement.queryAll(By.css('input[type="radio"]'));

        expect(radioButtons).toHaveLength(userProfile.paymentOptions.length);
    });

    it('renders each payment option', () => {
        const paymentOptions = fixture.debugElement.queryAll(By.css('ngxp-payment-option'))
            .map(debugElement => debugElement.nativeElement);

        userProfile.paymentOptions.forEach((paymentOption, i) => {
            expect(paymentOptions[i].paymentOption).toBe(paymentOption);
        })
    });

    it('selects the first payment option by default', () => {
        expect(component.selectedPaymentOption).toBe(userProfile.paymentOptions[0]);
    });

    describe('writeValue', () => {
        it('sets the selected payment option', () => {
            // tslint:disable-next-line: no-non-null-assertion
            const selectedPaymentOption = last(userProfile.paymentOptions)!;

            component.writeValue(selectedPaymentOption);

            expect(component.selectedPaymentOption).toBe(selectedPaymentOption);
        });
    });
});
