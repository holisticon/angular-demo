module.exports = {
  name: 'user-profile',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/user-profile',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
