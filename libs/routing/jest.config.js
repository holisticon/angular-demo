module.exports = {
  name: 'routing',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/routing',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
