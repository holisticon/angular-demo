module.exports = {
  name: 'orders-common',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/orders-common',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
