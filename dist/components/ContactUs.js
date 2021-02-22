"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var ContactUs = function ContactUs(_ref) {
  var title = _ref.title,
      error = _ref.error;
  var subject = "".concat(process.env.REACT_APP_WEBSITE_NAME, " - ").concat(title);
  var body = "\n    ** Please add any helpful information here - such as how you were trying to access\n       the page (bookmark, link from another website) or feature you were trying to use. **\n\nPage: ".concat(window.location.href, "\nError: ").concat(error || 'No Error Reported', "\nBrowser: ").concat(navigator.userAgent, "\n");
  var mailToLink = "mailto:orhelpdesk@osu.edu?subject=".concat(encodeURIComponent(subject), "&body=").concat(encodeURIComponent(body));
  return /*#__PURE__*/_react.default.createElement("p", {
    style: {
      marginTop: '2.5rem'
    }
  }, "For assistance please contact the OR Help Desk at ", /*#__PURE__*/_react.default.createElement("a", {
    href: mailToLink
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-envelope-o"
  }), " orhelpdesk@osu.edu"), "\xA0or ", /*#__PURE__*/_react.default.createElement("a", {
    href: "tel:6146888288"
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-phone"
  }), " 614-688-8288"), ".");
};

var _default = ContactUs;
exports.default = _default;