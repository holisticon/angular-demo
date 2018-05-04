import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'cfha-navbar',
    templateUrl: './navbar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {}
