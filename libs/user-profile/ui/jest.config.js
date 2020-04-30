module.exports = {
  name: 'user-profile-ui',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/user-profile/ui',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
