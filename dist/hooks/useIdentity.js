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
  return (0, _react.useContext)(_AuthContext.default);
}

var _default = useIdentity;
exports.default = _default;