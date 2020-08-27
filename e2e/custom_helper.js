const { Helper } = codeceptjs;
const assert = require('assert');

class Custom extends Helper {

    async seeInEach(locator, expected) {
        debugger
        const texts = await this.helpers.Playwright.grabTextFrom(locator);

        assert(texts.length > 0, `Expected at least one element matching selector <${JSON.stringify(locator)}>.`);

        texts.forEach(
            text => assert(text.toLowerCase().includes(expected.toLowerCase()), `Expected <${text}> to contain <${expected}>.`)
        );
    }

}

module.exports = Custom;
