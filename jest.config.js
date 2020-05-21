module.exports = {
    testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
    transform: {
        '^.+\\.(ts|js|html)$': 'ts-jest'
    },
    moduleNameMapper: {
        'lodash-es': 'lodash'
    },
    resolver: '@nrwl/jest/plugins/resolver',
    moduleFileExtensions: ['ts', 'js', 'html'],
    coverageReporters: ['html', 'text'],
    coveragePathIgnorePatterns: ['test'],
    globals: {
        'ts-jest': {
            isolatedModules: true
        }
    }
};
