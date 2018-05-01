import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { lib } from '@luchsamapparat/cfha-lib';

@Component({
  selector: 'cfha-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  test = lib;
}
