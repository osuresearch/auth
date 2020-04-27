"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _useIdentity2 = _interopRequireDefault(require("../hooks/useIdentity"));

var Profile = function Profile(_ref) {
  var _ref$editUrl = _ref.editUrl,
      editUrl = _ref$editUrl === void 0 ? '/register' : _ref$editUrl,
      children = _ref.children;

  var _useIdentity = (0, _useIdentity2.default)(),
      user = _useIdentity.user,
      logout = _useIdentity.logout; // Not logged in - nothing to show.


  if (!user) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "profile dropdown"
  }, /*#__PURE__*/_react.default.createElement("a", {
    href: "#",
    className: "dropdown-toggle",
    id: "profile-dropdown",
    "data-toggle": "dropdown",
    "aria-haspopup": "true",
    "aria-expanded": "false"
  }, user.username), /*#__PURE__*/_react.default.createElement("div", {
    className: "dropdown-menu dropdown-menu-right",
    "aria-labelledby": "profile-dropdown"
  }, /*#__PURE__*/_react.default.createElement("a", {
    className: "dropdown-item",
    href: editUrl
  }, "My Profile"), children, /*#__PURE__*/_react.default.createElement("div", {
    className: "dropdown-divider"
  }), /*#__PURE__*/_react.default.createElement("button", {
    className: "dropdown-item profile-logout",
    onClick: logout
  }, "Logout")));
};

var _default = Profile;
exports.default = _default;