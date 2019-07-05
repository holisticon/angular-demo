module.exports = {
  name: 'shopping-cart-common',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/shopping-cart-common',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
