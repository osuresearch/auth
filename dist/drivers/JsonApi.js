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
        var res, _yield$res$json, data, jsonApiIdentity, identity;

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
                _context.next = 5;
                return res.json();

              case 5:
                _yield$res$json = _context.sent;
                data = _yield$res$json.data;

                if (!(typeof data.attributes === 'undefined' || data.type !== 'User')) {
                  _context.next = 9;
                  break;
                }

                throw new Error("Malformed identity API response: ".concat(JSON.stringify(data)));

              case 9:
                jsonApiIdentity = data;
                identity = {
                  id: jsonApiIdentity.id,
                  // ...jsonApiIdentity.attributes
                  // Make extractions explicit, otherwise developers may add  
                  // extra stuff that won't be supported in the future AWS-lands.
                  // Making migration that much harder. 
                  name: jsonApiIdentity.attributes.name,
                  username: jsonApiIdentity.attributes.username,
                  email: jsonApiIdentity.attributes.email,
                  permissions: jsonApiIdentity.attributes.permissions,
                  emulation: jsonApiIdentity.attributes.emulation,
                  // Policies are currently not supported by JSON:API.
                  policies: []
                };
                return _context.abrupt("return", [_types.ConnectionState.LOGGED_IN, identity]);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
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