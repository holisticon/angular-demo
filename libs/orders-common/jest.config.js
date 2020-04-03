module.exports = {
  name: 'orders-common',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/orders-common',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
