/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file.js');
type Custom = import('./custom_helper.js');

declare namespace CodeceptJS {
  interface SupportObject { I: CodeceptJS.I }
  interface CallbackOrder { [0]: CodeceptJS.I }
  interface Methods extends CodeceptJS.Playwright, Custom {}
  interface I extends ReturnType<steps_file> {}
  namespace Translation {
    interface Actions {}
  }
}
