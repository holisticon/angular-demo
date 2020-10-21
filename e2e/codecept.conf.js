exports.config = {
    require: ["ts-node/register"],
    output: './output',
    helpers: {
        Playwright: {
            url: 'http://localhost:4200',
            show: true,
            browser: 'chromium',
            waitForNavigation: 'networkidle',
            waitForAction: 500,
            fullPageScreenshots: true
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
        steps: [
            './step_definitions/steps.ts',
            './step_definitions/homepage_steps.ts',
            './step_definitions/product_details_steps.ts',
            './step_definitions/search_results_steps.ts',
            './step_definitions/shopping_cart_steps.ts'
        ]
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
