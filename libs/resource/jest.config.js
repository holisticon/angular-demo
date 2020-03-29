module.exports = {
  name: "resource",
  preset: "../../jest.config.js",
  coverageDirectory: "../../coverage/libs/resource",
  snapshotSerializers: [
    "jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js",
    "jest-preset-angular/build/AngularSnapshotSerializer.js",
    "jest-preset-angular/build/HTMLCommentSerializer.js"
  ]
};
