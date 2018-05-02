import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { lib } from '@luchsamapparat/cfha-lib';
import { HypermediaClientService } from '@luchsamapparat/ngx-hypermedia-client';

@Component({
  selector: 'cfha-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  simpleLib = lib;
  angularLib = null;

  constructor(
    private hypermediaClient: HypermediaClientService
  ) {
    this.angularLib = hypermediaClient.test();
  }
}
