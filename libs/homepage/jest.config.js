module.exports = {
  name: 'homepage',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/homepage',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
