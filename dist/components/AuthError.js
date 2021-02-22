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
 * Display error information when the authentication endpoint has an error
 * (backend issue of some sort, Apache, PHP, SQL, etc etc)
 */
var AuthError = function AuthError(_ref) {
  var error = _ref.error;
  return /*#__PURE__*/_react.default.createElement(_FullPageMessage.default, {
    title: "Authentication Error"
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "lead"
  }, error), /*#__PURE__*/_react.default.createElement(_ContactUs.default, {
    title: "Authentication Error",
    error: error
  }));
};

var _default = AuthError;
exports.default = _default;