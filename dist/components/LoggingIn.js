"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

/**
 *
 */
var LoggingIn = function LoggingIn() {
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      margin: '1rem'
    }
  }, "Logging into ", process.env.REACT_APP_WEBSITE_NAME, "...");
};

var _default = LoggingIn;
exports.default = _default;