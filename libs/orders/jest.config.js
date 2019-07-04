module.exports = {
  name: 'orders',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/orders',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
