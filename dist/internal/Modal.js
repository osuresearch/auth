"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

/**
 * Wrapper around Bootstrap 4 Modals
 */
var Modal = function Modal(_ref) {
  var keyboard = _ref.keyboard,
      backdrop = _ref.backdrop,
      children = _ref.children;
  var ref = (0, _react.createRef)(); // window.$(this.ref.current).modal('hide');

  (0, _react.useEffect)(function () {
    // @ts-ignore 
    window.$(ref.current).modal({
      keyboard: keyboard,
      backdrop: backdrop
    });
    return function () {
      // @ts-ignore
      window.$(ref.current).modal('hide');
    };
  }, [ref, keyboard, backdrop]);
  return (0, _reactDom.createPortal)( /*#__PURE__*/_react.default.createElement("div", {
    className: "modal fade",
    tabIndex: -1,
    role: "dialog",
    "aria-hidden": "true",
    ref: ref
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "modal-dialog",
    role: "document"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "modal-content"
  }, children))), document.body);
};

var _default = Modal;
exports.default = _default;