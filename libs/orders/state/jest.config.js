module.exports = {
  name: 'orders-state',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/orders/state',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
