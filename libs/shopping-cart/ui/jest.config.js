module.exports = {
  name: 'shopping-cart-ui',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/shopping-cart/ui',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
