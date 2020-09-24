"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ = require("..");

/**
 * Check against policies and permissions before rendering children.
 * 
 * If `on` is not provided, the authenticated user's policies and
 * permissions are checked for a match to `do`. 
 * 
 * If `on` is provided, the policies declared in the `on` object
 * will be checked for a match to `do`.
 */
var Can = function Can(props) {
  var _useIdentity = (0, _.useIdentity)(),
      user = _useIdentity.user;

  var allowed = false;

  if (typeof props.on !== 'undefined') {
    allowed = props.on.policies.indexOf(props.do) >= 0;
  } else if (user) {
    // TODO: policies in @oris/auth user model. For now, we unsafely hack it in.
    allowed = user.permissions.indexOf(props.do) >= 0 || user.policies.indexOf(props.do) >= 0;
  }

  if (!allowed) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, props.children);
};

var _default = Can;
exports.default = _default;