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
  ConnectionState[ConnectionState["API_ERROR"] = 2] = "API_ERROR";
  ConnectionState[ConnectionState["NETWORK_ERROR"] = 3] = "NETWORK_ERROR";
  ConnectionState[ConnectionState["NOT_LOGGED_IN"] = 4] = "NOT_LOGGED_IN";
})(ConnectionState || (exports.ConnectionState = ConnectionState = {}));

;
/**
 * Interface for an object that contains one or more attached policies (contextual permissions)
 */

;
;