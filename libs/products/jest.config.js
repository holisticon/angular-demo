module.exports = {
  name: 'products',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/products',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
