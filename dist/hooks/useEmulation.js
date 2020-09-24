"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _react = require("react");

var _AuthContext = _interopRequireDefault(require("../context/AuthContext"));

var _utility = require("../internal/utility");

/**
 * Emulation query and control
 */
function useEmulation() {
  var _user$emulation, _user$emulation2;

  var _useContext = (0, _react.useContext)(_AuthContext.default),
      state = _useContext.state,
      user = _useContext.user,
      emulate = _useContext.emulate,
      clearEmulation = _useContext.clearEmulation;

  if (typeof state === 'undefined') {
    throw new Error('Cannot call `useEmulation` outside an IdM context. ' + 'Are you calling it from outside an AuthProvider?');
  }

  var active = (user === null || user === void 0 ? void 0 : (_user$emulation = user.emulation) === null || _user$emulation === void 0 ? void 0 : _user$emulation.active) || false;
  var allowed = (user === null || user === void 0 ? void 0 : (_user$emulation2 = user.emulation) === null || _user$emulation2 === void 0 ? void 0 : _user$emulation2.allowed) || false;

  var emulateImpl = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(id) {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!id) {
                _context.next = 5;
                break;
              }

              _context.next = 3;
              return emulate(id);

            case 3:
              _context.next = 7;
              break;

            case 5:
              _context.next = 7;
              return clearEmulation();

            case 7:
              window.location.href = (0, _utility.basepath)();

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function emulateImpl(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  return {
    active: active,
    allowed: allowed,
    emulate: emulateImpl
  };
}

var _default = useEmulation;
exports.default = _default;