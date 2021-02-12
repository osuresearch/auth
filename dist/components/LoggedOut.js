"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

/**
 * Display a "you've been automatically logged out" type page,
 * forcing the user to reauthenticate with Shibboleth.
 */
var LoggedOut = function LoggedOut() {
  // CSS is baked in for now since it's the only component with css
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "logged-out",
    style: {
      width: '100vw',
      height: '100%',
      minHeight: '100vh',
      backgroundColor: '#efefef',
      textAlign: 'center',
      backgroundImage: 'url(/assets/img/buckeye-leaf.png)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '80%',
      backgroundPosition: '5% 15%'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "logged-out-banner",
    style: {
      borderBottom: '10px solid #BB0000',
      backgroundImage: 'url(/assets/img/grey-ohio-banner.jpg)',
      height: 175,
      backgroundPosition: 'center right',
      backgroundSize: '100% auto'
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "logged-out-message",
    style: {
      padding: '5% 15%'
    }
  }, /*#__PURE__*/_react.default.createElement("h1", {
    style: {
      marginBottom: '1.5rem'
    }
  }, "You have been logged out for inactivity."), /*#__PURE__*/_react.default.createElement("p", {
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
  }, "Log In"))));
};

var _default = LoggedOut;
exports.default = _default;