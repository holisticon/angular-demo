module.exports = {
  name: "resource",
  preset: "../../jest.config.js",
  coverageDirectory: "../../coverage/libs/resource",
  snapshotSerializers: [
    "jest-preset-angular/AngularSnapshotSerializer.js",
    "jest-preset-angular/HTMLCommentSerializer.js"
  ]
};
