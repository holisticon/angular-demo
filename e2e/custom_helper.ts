const assert = require('assert');
import { Helper } from 'codeceptjs';

class CustomHelper extends Helper {

    async seeInEach(locator: CodeceptJS.LocatorOrString, expected: string) {
        const playwright: CodeceptJS.Playwright = this.helpers.Playwright;
        const texts = await playwright.grabTextFromAll(locator);

        assert(texts.length > 0, `Expected at least one element matching selector <${JSON.stringify(locator)}>.`);

        texts.forEach(
            text => assert(text.toLowerCase().includes(expected.toLowerCase()), `Expected <${text}> to contain <${expected}>.`)
        );
    }

}

export = CustomHelper;
