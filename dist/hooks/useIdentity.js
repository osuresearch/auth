"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _AuthContext = _interopRequireDefault(require("../context/AuthContext"));

var _types = require("../types");

/**
 * IdM identity access
 */
function useIdentity() {
  var _useContext = (0, _react.useContext)(_AuthContext.default),
      state = _useContext.state,
      user = _useContext.user,
      verifyLogin = _useContext.verifyLogin,
      logout = _useContext.logout;

  if (typeof verifyLogin === 'undefined' || typeof logout === 'undefined') {
    throw new Error('Cannot call `useIdentity` outside an IdM context. ' + 'Are you calling it from outside an AuthProvider?');
  }

  return {
    user: user,
    state: state || _types.ConnectionState.UNKNOWN,
    permissions: new Set((user === null || user === void 0 ? void 0 : user.permissions) || []),
    verifyLogin: verifyLogin,
    logout: logout
  };
}

var _default = useIdentity;
exports.default = _default;