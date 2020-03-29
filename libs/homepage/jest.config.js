module.exports = {
  name: 'homepage',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/homepage',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
