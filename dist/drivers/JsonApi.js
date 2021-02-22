"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = JsonApi;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _utility = require("../internal/utility");

var _types = require("../types");

;
/**
 * Driver that communicates with a standard JSON:API backend.
 */

var JsonApiDriver = /*#__PURE__*/function () {
  function JsonApiDriver(endpoint, emulateEndpoint) {
    (0, _classCallCheck2.default)(this, JsonApiDriver);
    this.endpoint = endpoint;
    this.emulateEndpoint = emulateEndpoint;
  }

  (0, _createClass2.default)(JsonApiDriver, [{
    key: "refreshIdentity",
    value: function () {
      var _refreshIdentity = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var res, _yield$res$json, data, jsonApiIdentity, user;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetch(this.endpoint, {
                  cache: 'no-cache',
                  redirect: 'follow',
                  credentials: 'same-origin',
                  headers: {
                    'Content-Type': 'application/json'
                  }
                });

              case 2:
                res = _context.sent;
                _context.prev = 3;
                _context.next = 6;
                return res.json();

              case 6:
                _yield$res$json = _context.sent;
                data = _yield$res$json.data;

                if (!(typeof data.attributes === 'undefined' || data.type !== 'User')) {
                  _context.next = 10;
                  break;
                }

                throw new Error();

              case 10:
                jsonApiIdentity = data;
                user = {
                  id: jsonApiIdentity.id,
                  // Make extractions explicit, otherwise developers may add
                  // extra stuff that won't be supported in the future AWS-lands.
                  // Making migration that much harder.
                  name: jsonApiIdentity.attributes.name,
                  username: jsonApiIdentity.attributes.username,
                  email: jsonApiIdentity.attributes.email,
                  permissions: jsonApiIdentity.attributes.permissions,
                  emulation: jsonApiIdentity.attributes.emulation
                }; // If it parsed correctly, pass the identity forward

                return _context.abrupt("return", {
                  state: _types.ConnectionState.LOGGED_IN,
                  user: user,
                  error: undefined
                });

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](3);
                console.error('[auth]- JSON:API Driver Error:', _context.t0); // Any errors will be caught as a parsing issue from the API.

                return _context.abrupt("return", {
                  state: _types.ConnectionState.API_ERROR,
                  user: undefined,
                  error: 'The server did not provide valid user information'
                });

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 15]]);
      }));

      function refreshIdentity() {
        return _refreshIdentity.apply(this, arguments);
      }

      return refreshIdentity;
    }()
  }, {
    key: "emulate",
    value: function () {
      var _emulate = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(id) {
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return fetch(this.emulateEndpoint, {
                  method: 'POST',
                  body: JSON.stringify({
                    id: id
                  }),
                  headers: {
                    'Content-Type': 'application/json'
                  }
                });

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function emulate(_x) {
        return _emulate.apply(this, arguments);
      }

      return emulate;
    }()
  }, {
    key: "clearEmulation",
    value: function () {
      var _clearEmulation = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return fetch(this.emulateEndpoint, {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json'
                  }
                });

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function clearEmulation() {
        return _clearEmulation.apply(this, arguments);
      }

      return clearEmulation;
    }()
  }]);
  return JsonApiDriver;
}();

function JsonApi() {
  var endpoint = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "".concat((0, _utility.basepath)(), "/api/user");
  var emulateEndpoint = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "".concat((0, _utility.basepath)(), "/api/emulate");
  return new JsonApiDriver(endpoint, emulateEndpoint);
}