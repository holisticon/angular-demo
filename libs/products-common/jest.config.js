module.exports = {
  name: 'products-common',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/products-common',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
