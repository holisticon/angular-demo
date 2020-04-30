module.exports = {
  name: 'user-profile-domain',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/user-profile/domain',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
