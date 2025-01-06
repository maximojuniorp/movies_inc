module.exports = {
  preset: "react-native",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|@react-native-community|@react-native/js-polyfills|react-native-vector-icons)/)",
  ],
  testPathIgnorePatterns: ['/node_modules/', '/__mocks__/'],
};