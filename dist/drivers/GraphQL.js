"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GraphQL;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _utility = require("../internal/utility");

var _types = require("../types");

;

var GraphQLDriver = /*#__PURE__*/function () {
  function GraphQLDriver(endpoint) {
    (0, _classCallCheck2.default)(this, GraphQLDriver);
    this.endpoint = endpoint;
  }
  /**
   * @throws {Error}              If a network error occurs (such as a CORS error)
   *
   * @returns {DriverResponse}    Response with user information or error information
   *                              if the server's response payload is invalid.
   */


  (0, _createClass2.default)(GraphQLDriver, [{
    key: "refreshIdentity",
    value: function () {
      var _refreshIdentity = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var res, _yield$res$json, data, response, user;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetch(this.endpoint, {
                  method: 'POST',
                  cache: 'no-cache',
                  redirect: 'follow',
                  credentials: 'same-origin',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    query: "\n                {\n                    me {\n                        id\n                        username\n                        email\n                        name\n                        permissions\n                        policies\n                        emulation {\n                            active\n                            allowed\n                        }\n                    }\n                }\n            "
                  })
                });

              case 2:
                res = _context.sent;
                _context.prev = 3;
                _context.next = 6;
                return res.json();

              case 6:
                _yield$res$json = _context.sent;
                data = _yield$res$json.data;

                if (!(typeof data === 'undefined')) {
                  _context.next = 10;
                  break;
                }

                throw new Error();

              case 10:
                if (!Array.isArray(data.errors)) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt("return", {
                  state: _types.ConnectionState.API_ERROR,
                  user: undefined,
                  error: data.errors[0].message
                });

              case 12:
                response = data.me;
                user = {
                  id: response.id,
                  name: response.name,
                  username: response.username,
                  email: response.email,
                  permissions: response.permissions,
                  emulation: response.emulation
                }; // If it parsed correctly, pass the identity forward

                return _context.abrupt("return", {
                  state: _types.ConnectionState.LOGGED_IN,
                  user: user,
                  error: undefined
                });

              case 17:
                _context.prev = 17;
                _context.t0 = _context["catch"](3);
                console.error('[auth]- GraphQL Driver Error:', _context.t0); // Any errors will be caught as a parsing issue from the API.

                return _context.abrupt("return", {
                  state: _types.ConnectionState.API_ERROR,
                  user: undefined,
                  error: 'The server did not provide valid user information'
                });

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 17]]);
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
        var res, _yield$res$json2, data;

        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return fetch(this.endpoint, {
                  method: 'POST',
                  cache: 'no-cache',
                  redirect: 'follow',
                  credentials: 'same-origin',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    query: "\n                    mutation SetEmulation($id: String!) {\n                        emulate(identifier: $id) {\n                            id\n                            username\n                        }\n                    }\n                ",
                    variables: {
                      id: id
                    }
                  })
                });

              case 2:
                res = _context2.sent;
                _context2.next = 5;
                return res.json();

              case 5:
                _yield$res$json2 = _context2.sent;
                data = _yield$res$json2.data;

              case 7:
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
        var res, _yield$res$json3, data;

        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return fetch(this.endpoint, {
                  method: 'POST',
                  cache: 'no-cache',
                  redirect: 'follow',
                  credentials: 'same-origin',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    query: "\n                    mutation ClearEmulation {\n                        emulate {\n                            id\n                            username\n                        }\n                    }\n                "
                  })
                });

              case 2:
                res = _context3.sent;
                _context3.next = 5;
                return res.json();

              case 5:
                _yield$res$json3 = _context3.sent;
                data = _yield$res$json3.data;

              case 7:
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
  return GraphQLDriver;
}();

function GraphQL() {
  var endpoint = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "".concat((0, _utility.basepath)(), "/api/graphql/");
  return new GraphQLDriver(endpoint);
}