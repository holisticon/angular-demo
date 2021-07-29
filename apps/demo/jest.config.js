module.exports = {
    name: 'demo',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/apps/demo',

    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            stringifyContentPathRegex: '\\.(html|svg)$',
            astTransformers: [
                'jest-preset-angular/build/InlineFilesTransformer',
                'jest-preset-angular/build/StripStylesTransformer',
            ],
            tsconfig: '<rootDir>/tsconfig.spec.json',
        },
    },
    snapshotSerializers: [
        'jest-preset-angular/build/serializers/no-ng-attributes',
        'jest-preset-angular/build/serializers/ng-snapshot',
        'jest-preset-angular/build/serializers/html-comment',
    ],
    transform: {
        '^.+\\.(ts|js|html)$': 'jest-preset-angular',
    },
};
