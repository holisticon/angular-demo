module.exports = {
  name: 'orders-domain',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/orders/domain',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
