module.exports = {
  name: 'shopping-cart',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/shopping-cart',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
