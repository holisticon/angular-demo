module.exports = {
  name: 'products-domain',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/products/domain',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
