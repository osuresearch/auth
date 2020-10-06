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

  (0, _createClass2.default)(GraphQLDriver, [{
    key: "refreshIdentity",
    value: function () {
      var _refreshIdentity = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var res, _yield$res$json, data, response, identity;

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
                    query: "\n                {\n                    me {\n                        id\n                        username\n                        email\n                        firstName\n                        permissions\n                        policies\n                        emulation {\n                            active\n                            allowed\n                        }\n                    }\n                }\n            "
                  })
                });

              case 2:
                res = _context.sent;
                _context.next = 5;
                return res.json();

              case 5:
                _yield$res$json = _context.sent;
                data = _yield$res$json.data;
                console.debug(data); // Ensure the payload is not malformed

                if (!(typeof data === 'undefined' || typeof data.me === 'undefined')) {
                  _context.next = 10;
                  break;
                }

                throw new Error("Malformed API response: ".concat(JSON.stringify(data)));

              case 10:
                response = data.me;
                identity = {
                  id: response.id,
                  name: response.firstName,
                  username: response.username,
                  email: response.email,
                  permissions: response.permissions,
                  policies: response.policies,
                  emulation: response.emulation
                };
                return _context.abrupt("return", [_types.ConnectionState.LOGGED_IN, identity]);

              case 13:
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