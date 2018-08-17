import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'ngxp-navbar',
    templateUrl: './navbar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {}
