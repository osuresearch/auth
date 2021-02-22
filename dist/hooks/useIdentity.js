"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _AuthContext = _interopRequireDefault(require("../context/AuthContext"));

/**
 * IdM identity access
 */
function useIdentity() {
  var context = (0, _react.useContext)(_AuthContext.default);

  if (typeof context.verifyLogin === 'undefined') {
    throw new Error('Cannot call `useIdentity` outside an authenticated context. ' + 'Make sure it is only called from within an <AuthProvider>.');
  }

  return context;
}

var _default = useIdentity;
exports.default = _default;