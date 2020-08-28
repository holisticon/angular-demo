exports.config = {
    require: ["ts-node/register"],
    output: './output',
    helpers: {
        Playwright: {
            url: 'http://localhost:4200',
            show: true,
            browser: 'chromium',
            waitForNavigation: 'networkidle'
        },
        Custom: {
            require: './custom_helper.ts',
        }
    },
    include: {
        I: './steps_file.ts'
    },
    mocha: {},
    bootstrap: null,
    teardown: null,
    hooks: [],
    gherkin: {
        features: './features/*.feature',
        steps: ['./step_definitions/steps.ts']
    },
    plugins: {
        screenshotOnFail: {
            enabled: true
        },
        retryFailedStep: {
            enabled: true
        }
    },
    tests: './*_test.ts',
    name: 'e2e'
}
