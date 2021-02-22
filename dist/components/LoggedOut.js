"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _FullPageMessage = _interopRequireDefault(require("./FullPageMessage"));

/**
 * Display a "you've been automatically logged out" type page,
 * forcing the user to reauthenticate with Shibboleth.
 */
var LoggedOut = function LoggedOut() {
  return /*#__PURE__*/_react.default.createElement(_FullPageMessage.default, {
    title: "You have been logged out for inactivity."
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "lead",
    style: {
      marginBottom: '2.5rem'
    }
  }, "Remember to ", /*#__PURE__*/_react.default.createElement("a", {
    href: "https://ocio.osu.edu/KB02788"
  }, "clear your browser history"), " to avoid improper access to whatever web sites you've been using if this is a shared machine, and never leave your own machine unlocked and unattended."), /*#__PURE__*/_react.default.createElement("form", {
    action: process.env.PUBLIC_URL
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "submit",
    className: "btn btn-primary",
    style: {
      textDecoration: 'none'
    }
  }, "Log In")));
};

var _default = LoggedOut;
exports.default = _default;