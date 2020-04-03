module.exports = {
  name: 'user-profile',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/user-profile',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
