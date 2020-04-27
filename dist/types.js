"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConnectionState = void 0;

/** Enum representing our current connection to the server. */
var ConnectionState;
exports.ConnectionState = ConnectionState;

(function (ConnectionState) {
  ConnectionState[ConnectionState["UNKNOWN"] = 0] = "UNKNOWN";
  ConnectionState[ConnectionState["LOGGED_IN"] = 1] = "LOGGED_IN";
  ConnectionState[ConnectionState["NETWORK_ERROR"] = 2] = "NETWORK_ERROR";
  ConnectionState[ConnectionState["NOT_LOGGED_IN"] = 3] = "NOT_LOGGED_IN";
})(ConnectionState || (exports.ConnectionState = ConnectionState = {}));

;
;
/** Payload from a JSON:API IdM endpoint */

;