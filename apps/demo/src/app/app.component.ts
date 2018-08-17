import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'ngxp-root',
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
