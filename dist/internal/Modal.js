"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

/**
 * Wrapper around Bootstrap 4 Modals.
 * 
 * This is an updated non-compatible version of the @oris/ui Modal
 * that is more React friendly. Eventually moved into @oris/ui.
 */
var Modal = function Modal(_ref) {
  var onRequestClose = _ref.onRequestClose,
      title = _ref.title,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      _ref$isOpen = _ref.isOpen,
      isOpen = _ref$isOpen === void 0 ? false : _ref$isOpen,
      _ref$hasCloseButton = _ref.hasCloseButton,
      hasCloseButton = _ref$hasCloseButton === void 0 ? true : _ref$hasCloseButton,
      children = _ref.children;
  var ref = /*#__PURE__*/(0, _react.createRef)(); // Sanity check for invalid prop combinations

  if (hasCloseButton && !onRequestClose) {
    throw new Error('Modal cannot have a close button without a `onRequestClose` callback');
  }

  (0, _react.useEffect)(function () {
    // @ts-ignore 
    var $el = window.$(ref.current);
    $el.modal({
      // Disable the user's ability to close this modal.
      // We'll use a custom close mechanic that integrates
      // better with React.
      keyboard: false,
      backdrop: 'static',
      show: false
    });
  }, [ref]);
  (0, _react.useEffect)(function () {
    if (!ref.current) {
      return;
    } // @ts-ignore 


    var $el = window.$(ref.current);

    if (isOpen) {
      $el.modal('show');
    } else {
      $el.modal('hide');
    }
  }, [ref, isOpen]);
  return /*#__PURE__*/(0, _reactDom.createPortal)( /*#__PURE__*/_react.default.createElement("div", {
    className: "modal fade",
    tabIndex: -1,
    role: "dialog",
    "aria-hidden": "true",
    ref: ref
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "modal-dialog ".concat(className),
    role: "document"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/_react.default.createElement("h5", {
    className: "modal-title"
  }, title), hasCloseButton && onRequestClose && /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "close",
    "aria-label": "Close",
    onClick: onRequestClose
  }, /*#__PURE__*/_react.default.createElement("span", {
    "aria-hidden": "true"
  }, "\xD7"))), children))), document.body);
};

var _default = Modal;
exports.default = _default;