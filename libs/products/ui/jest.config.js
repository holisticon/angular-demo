module.exports = {
  name: 'products-ui',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/products/ui',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
