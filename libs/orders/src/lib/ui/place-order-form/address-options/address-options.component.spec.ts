import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { userProfile } from '@ngxp/user-profile/test';
import { last } from 'lodash-es';
import { AddressOptionsComponent } from './address-options.component';


describe('AddressOptionsComponent', () => {
    let component: AddressOptionsComponent;
    let fixture: ComponentFixture<AddressOptionsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule
            ],
            declarations: [
                AddressOptionsComponent
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddressOptionsComponent);
        component = fixture.componentInstance;
        component.addresses = userProfile.addresses;
        fixture.detectChanges();
    });

    it('renders a radio button for each address', () => {
        const radioButtons = fixture.debugElement.queryAll(By.css('input[type="radio"]'));

        expect(radioButtons).toHaveLength(userProfile.addresses.length);
    });

    it('renders each address', () => {
        const addresses = fixture.debugElement.queryAll(By.css('ngxp-address'))
            .map(debugElement => debugElement.nativeElement);

        userProfile.addresses.forEach((address, i) => {
            expect(addresses[i].address).toBe(address);
        })
    });

    it('selects the first address by default', () => {
        expect(component.selectedAddress).toBe(userProfile.addresses[0]);
    });

    describe('writeValue', () => {
        it('sets the selected payment option', () => {
            // tslint:disable-next-line: no-non-null-assertion
            const selectedAddress = last(userProfile.addresses)!;

            component.writeValue(selectedAddress);

            expect(component.selectedAddress).toBe(selectedAddress);
        });
    });
});
