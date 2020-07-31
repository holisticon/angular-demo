module.exports = {
    testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
    testPathIgnorePatterns: ['demo-e2e'],
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
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['./test-setup.ts'],
    snapshotSerializers: [
        'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
        'jest-preset-angular/build/AngularSnapshotSerializer.js',
        'jest-preset-angular/build/HTMLCommentSerializer.js'
    ],
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
            astTransformers: [
                'jest-preset-angular/build/InlineFilesTransformer',
                'jest-preset-angular/build/StripStylesTransformer'
            ]
        }
    }
};
