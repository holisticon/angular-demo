import { ComponentFixture } from "@angular/core/testing";
import { isUndefined } from "lodash-es";

export function expectElementFromFixture<T>(fixture: ComponentFixture<T>, domQuery?: string): jasmine.Matchers<{} | null> {
    return expect(elementFromFixture(fixture, domQuery));
}

function elementFromFixture<T>(fixture: ComponentFixture<T>, domQuery?: string): Element | null {
    const nativeElement = getNativeElement(fixture);
    return isUndefined(domQuery) ? nativeElement : nativeElement.querySelector(domQuery);
}

function getNativeElement<T>(fixture: ComponentFixture<T>): HTMLElement {
    fixture.detectChanges();
    return fixture.nativeElement;
}
