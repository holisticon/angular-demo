
// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { addMatchers, initTestScheduler, getTestScheduler, resetTestScheduler } from 'jasmine-marbles';

declare const require: any;

// fix for "No test scheduler initialized" after updating to Angular 8
// see https://github.com/synapse-wireless-labs/jasmine-marbles/issues/40#issuecomment-499785967
const env = jasmine.getEnv();

env.beforeAll(() => addMatchers());
env.beforeEach(() => initTestScheduler());
env.afterEach(() => {
    getTestScheduler().flush();
    resetTestScheduler();
});

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./', true, /^\.\/(apps|libs)\/.+\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
