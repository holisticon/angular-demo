exports.config = {
    output: './output',
    helpers: {
        Playwright: {
            url: 'http://localhost:4200',
            show: true,
            browser: 'chromium'
        },
        Custom: {
            require: './custom_helper.js',
        }
    },
    include: {
        I: './steps_file.js'
    },
    mocha: {},
    bootstrap: null,
    teardown: null,
    hooks: [],
    gherkin: {
        features: './features/*.feature',
        steps: ['./step_definitions/steps.js']
    },
    plugins: {
        screenshotOnFail: {
            enabled: true
        },
        retryFailedStep: {
            enabled: true
        }
    },
    tests: './*_test.js',
    name: 'e2e'
}
