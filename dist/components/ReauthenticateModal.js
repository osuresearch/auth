"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _types = require("../types");

var _useIdentity2 = _interopRequireDefault(require("../hooks/useIdentity"));

var _Modal = _interopRequireDefault(require("../internal/Modal"));

var _utility = require("../internal/utility");

;
/**
 * Modal that appears and blocks user action when when the user is no longer authenticated.
 *
 * The user has the ability to log back into the application via a popup window
 * to avoid losing any unsaved work (This behavior can be disabled via `reloadOnLogout`)
 */

var ReauthenticateModal = function ReauthenticateModal(_ref) {
  var _ref$loginUrl = _ref.loginUrl,
      loginUrl = _ref$loginUrl === void 0 ? "".concat((0, _utility.basepath)(), "/api/login") : _ref$loginUrl;

  var _useIdentity = (0, _useIdentity2.default)(),
      state = _useIdentity.state,
      verifyLogin = _useIdentity.verifyLogin;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      showModal = _useState2[0],
      setShowModal = _useState2[1];

  var _useState3 = (0, _react.useState)(),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      loginWindow = _useState4[0],
      setLoginWindow = _useState4[1]; // Displays the login modal the moment the user is no longer logged in.
  // This will fire a verifyLogin() that will close the modal once they
  // have logged back into the application.


  (0, _react.useEffect)(function () {
    console.debug('[ReauthenticateModal] Effect', state);

    if (state === _types.ConnectionState.NOT_LOGGED_IN) {
      setShowModal(true);
      verifyLogin().then(function () {
        return setShowModal(false);
      });
    } else {
      setShowModal(false);
    }
  }, [state, verifyLogin]); // When the loginWindow popup is open, monitor the status on
  // an interval. Once it's closed, clear our reference to it.

  (0, _react.useEffect)(function () {
    console.debug('[ReauthenticateModal] Window ref changed', loginWindow);
    var handle = setInterval(function () {
      if (loginWindow && loginWindow.closed) {
        setLoginWindow(undefined);
      }
    }, 800);
    return function () {
      return clearInterval(handle);
    };
  }, [loginWindow]); // Open a browser popup window to start a new login session.
  // This has to happen directly from user action (e.g. clicking
  // a button) otherwise most popup blockers will block it.

  var openLoginWindow = function openLoginWindow() {
    if (loginWindow && !loginWindow.closed) {
      loginWindow.focus();
      return;
    }

    var newWindow = window.open(loginUrl, 'Login', 'width=800,height=600'); // TODO: Handle null retval. Popup blocker?

    setLoginWindow(newWindow || undefined);
  };

  var isLoginWindowOpen = loginWindow && !loginWindow.closed;
  return /*#__PURE__*/_react.default.createElement(_Modal.default, {
    title: "Session Expired",
    isOpen: showModal,
    hasCloseButton: false
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/_react.default.createElement("p", null, "Your session has expired and you have been logged out."), /*#__PURE__*/_react.default.createElement("p", null, "To avoid losing any unsaved work, click the ", /*#__PURE__*/_react.default.createElement("strong", null, "Login"), " button below to log back into the application.")), /*#__PURE__*/_react.default.createElement("div", {
    className: "modal-footer"
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "btn btn-success",
    onClick: openLoginWindow
  }, isLoginWindowOpen && /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-spinner fa-spin"
  }), "\xA0 Waiting for login..."), !isLoginWindowOpen && /*#__PURE__*/_react.default.createElement("span", null, "Login"))));
};

var _default = ReauthenticateModal;
exports.default = _default;