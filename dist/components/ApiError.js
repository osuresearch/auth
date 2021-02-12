"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

/**
 * Display error information when the authentication endpoint has an error
 * (backend issue of some sort, Apache, PHP, SQL, etc etc)
 */
var ApiError = function ApiError(_ref) {
  var error = _ref.error;
  var subject = "".concat(process.env.REACT_APP_WEBSITE_NAME, " - Authentication Error");
  var body = "\n    ** Please add any helpful information here - such as how you were trying to\n    access the page (bookmark, search bar, navigation link from another website, etc) **\n\nPage: ".concat(window.location.href, "\nError: ").concat(error || 'No Error Reported', "\nBrowser: ").concat(navigator.userAgent, "\n");
  var mailToLink = "mailto:orhelpdesk@osu.edu?subject=".concat(encodeURIComponent(subject), "&body=").concat(encodeURIComponent(body));
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      margin: '2rem'
    }
  }, /*#__PURE__*/_react.default.createElement("h1", null, "Authentication Error"), /*#__PURE__*/_react.default.createElement("p", null, error), /*#__PURE__*/_react.default.createElement("p", {
    className: "error-help"
  }, "For assistance please contact the OR Help Desk at ", /*#__PURE__*/_react.default.createElement("a", {
    href: mailToLink
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-envelope-o"
  }), " orhelpdesk@osu.edu")));
};

var _default = ApiError;
exports.default = _default;