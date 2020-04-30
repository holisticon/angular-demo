module.exports = {
  name: 'orders-views',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/orders/views',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
