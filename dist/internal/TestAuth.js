"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _useIdentity2 = _interopRequireDefault(require("../hooks/useIdentity"));

var _useEmulation2 = _interopRequireDefault(require("../hooks/useEmulation"));

/**
 * Component to test the different authentication features
 */
function TestAuth() {
  var _useIdentity = (0, _useIdentity2.default)(),
      user = _useIdentity.user,
      logout = _useIdentity.logout,
      verifyLogin = _useIdentity.verifyLogin;

  var _useEmulation = (0, _useEmulation2.default)(),
      emulate = _useEmulation.emulate,
      active = _useEmulation.active,
      allowed = _useEmulation.allowed;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var testVerify = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!loading) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              setLoading(true);
              console.log('Start verifier');
              _context.next = 6;
              return verifyLogin();

            case 6:
              // do your other (a)sync work here
              alert('Verified');
              setLoading(false);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function testVerify() {
      return _ref.apply(this, arguments);
    };
  }();

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "test-auth"
  }, /*#__PURE__*/_react.default.createElement("p", null, "Test functionality of auth components"), /*#__PURE__*/_react.default.createElement("p", null, "Current user is ", (user === null || user === void 0 ? void 0 : user.username) || 'not logged in'), /*#__PURE__*/_react.default.createElement("p", null, "Emulate is ", active ? 'active' : 'not active', " / ", allowed ? 'allowed' : 'not allowed'), /*#__PURE__*/_react.default.createElement("button", {
    onClick: testVerify
  }, loading && 'Loading', !loading && 'Test Verify'), /*#__PURE__*/_react.default.createElement("button", {
    onClick: function onClick() {
      return emulate('93111472');
    }
  }, "Emulate John"), /*#__PURE__*/_react.default.createElement("button", {
    onClick: function onClick() {
      return emulate();
    }
  }, "Clear emulate"), /*#__PURE__*/_react.default.createElement("button", {
    onClick: logout
  }, "Logout"));
}

var _default = TestAuth;
exports.default = _default;