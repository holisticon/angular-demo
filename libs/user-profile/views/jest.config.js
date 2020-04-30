module.exports = {
  name: 'user-profile-views',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/user-profile/views',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
