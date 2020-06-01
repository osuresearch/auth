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
  _ping = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(identityEndpoint, publicTestUrl) {
    var res, _yield$res$json, data, jsonApiIdentity, identity;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            console.debug('[ping] GET', identityEndpoint); // Grab updated identity information. Non-200 response 
            // is the assumption that we're no longer authenticated

            _context.next = 4;
            return fetch(identityEndpoint, {
              cache: 'no-cache',
              redirect: 'follow',
              credentials: 'same-origin',
              headers: {
                'Content-Type': 'application/json'
              }
            });

          case 4:
            res = _context.sent;
            _context.next = 7;
            return res.json();

          case 7:
            _yield$res$json = _context.sent;
            data = _yield$res$json.data;

            if (!(typeof data.attributes === 'undefined' || data.type !== 'User')) {
              _context.next = 11;
              break;
            }

            throw new Error("Malformed identity API response: ".concat(JSON.stringify(data)));

          case 11:
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
              emulation: jsonApiIdentity.attributes.emulation
            };
            return _context.abrupt("return", [_types.ConnectionState.LOGGED_IN, identity]);

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](0);
            console.error('[ping] Not logged in:', _context.t0);

          case 19:
            _context.prev = 19;
            console.debug('[ping] HEAD', publicTestUrl); // If a 200 response from the public url (or even a 404), 
            // the server is still reachable, we're just not authenticated

            _context.next = 23;
            return fetch(publicTestUrl, {
              method: 'HEAD',
              cache: 'no-cache',
              redirect: 'follow',
              credentials: 'same-origin'
            });

          case 23:
            return _context.abrupt("return", [_types.ConnectionState.NOT_LOGGED_IN, undefined]);

          case 26:
            _context.prev = 26;
            _context.t1 = _context["catch"](19);
            console.error('[ping] Cannot reach public URL:', _context.t1);

          case 29:
            return _context.abrupt("return", [_types.ConnectionState.NETWORK_ERROR, undefined]);

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 16], [19, 26]]);
  }));
  return _ping.apply(this, arguments);
}

var _default = ping;
exports.default = _default;