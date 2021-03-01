"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ui = require("@ORIS/ui");

var _utility = require("../internal/utility");

/**
 * Simple sign out button for apps without Profile but need to comply to audit
 */
var SimpleSignOutButton = function SimpleSignOutButton(_ref) {
  var _ref$url = _ref.url,
      url = _ref$url === void 0 ? _utility.DEFAULT_SSO_LOGOUT_URL : _ref$url;
  return /*#__PURE__*/_react.default.createElement("a", {
    href: url,
    title: "Sign out",
    style: {
      marginLeft: 'auto'
    }
  }, /*#__PURE__*/_react.default.createElement(_ui.Icon, {
    name: "sign-out"
  }));
};

var _default = SimpleSignOutButton;
exports.default = _default;