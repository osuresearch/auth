"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _types = require("../types");

/**
 * Check our connection state and get updated IdM information, if possible.
 * 
 * @return {Promise} Current connection state and updated IdM information, if connected
 */
function ping(_x, _x2) {
  return _ping.apply(this, arguments);
}

function _ping() {
  _ping = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(driver, publicTestUrl) {
    var result;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            console.debug('[ping] Refresh');
            _context.next = 4;
            return driver.refreshIdentity();

          case 4:
            result = _context.sent;
            return _context.abrupt("return", result);

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            console.error('[ping] Not logged in:', _context.t0);

          case 11:
            _context.prev = 11;
            console.debug('[ping] HEAD', publicTestUrl); // If a 200 response from the public url (or even a 404), 
            // the server is still reachable, we're just not authenticated

            _context.next = 15;
            return fetch(publicTestUrl, {
              method: 'HEAD',
              cache: 'no-cache',
              redirect: 'follow',
              credentials: 'same-origin'
            });

          case 15:
            return _context.abrupt("return", [_types.ConnectionState.NOT_LOGGED_IN, undefined]);

          case 18:
            _context.prev = 18;
            _context.t1 = _context["catch"](11);
            console.error('[ping] Cannot reach public URL:', _context.t1);

          case 21:
            return _context.abrupt("return", [_types.ConnectionState.NETWORK_ERROR, undefined]);

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8], [11, 18]]);
  }));
  return _ping.apply(this, arguments);
}

var _default = ping;
exports.default = _default;