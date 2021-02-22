"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ContactUs = _interopRequireDefault(require("./ContactUs"));

var _FullPageMessage = _interopRequireDefault(require("./FullPageMessage"));

/**
 * Display error information when the user cannot connect to anything (even non-authenticated resources)
 */
var NetworkError = function NetworkError(_ref) {
  var error = _ref.error;
  return /*#__PURE__*/_react.default.createElement(_FullPageMessage.default, {
    title: "Network Error"
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "lead"
  }, "We are unable to communicate with the server. Please make sure you are connected to the internet, then refresh the page and try again."), /*#__PURE__*/_react.default.createElement(_ContactUs.default, {
    title: "Network Error",
    error: error
  }));
};

var _default = NetworkError;
exports.default = _default;