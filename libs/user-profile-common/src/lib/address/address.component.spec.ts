import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Address } from '@luchsamapparat/user-profile-common';
import { AddressComponent } from './address.component';


describe('AddressComponent', () => {
    let component: AddressComponent;
    let fixture: ComponentFixture<AddressComponent>;

    const address: Address = {
        city: '',
        country: '',
        name: '',
        street: '',
        zipCode: ''
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AddressComponent
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddressComponent);
        component = fixture.componentInstance;
        component.address = address;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
