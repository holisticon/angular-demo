module.exports = {
  name: 'shopping-cart-views',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/shopping-cart/views',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
