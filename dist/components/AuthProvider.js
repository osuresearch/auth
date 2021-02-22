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

var _AuthContext = _interopRequireDefault(require("../context/AuthContext"));

var _types = require("../types");

var _ping = _interopRequireDefault(require("../internal/ping"));

var _utility = require("../internal/utility");

var _LoggingIn = _interopRequireDefault(require("./LoggingIn"));

var _LoggedOut = _interopRequireDefault(require("./LoggedOut"));

var _NetworkError = _interopRequireDefault(require("./NetworkError"));

var _AuthError = _interopRequireDefault(require("./AuthError"));

;
/** How frequent to ping the identity endpoint for an update while logged in */

var DEFAULT_PING_INTERVAL = 300 * 1000; // 5 minutes

/** How frequent to ping the identity endpoint for an update while NOT logged in */

var ACTIVE_PING_INTERVAL = 5000; // 5 seconds

/** Safe typing for setResolver() */

/**
 * Primary provider for authentication information for an application.
 *
 * This periodically pings an identity API endpoint for updated login information.
 * If the session has expired or the network connection is lost, this hook will
 * emit updated connection state information for other components to react to.
 */
var AuthProvider = function AuthProvider(_ref) {
  var children = _ref.children,
      driver = _ref.driver,
      _ref$publicTestUrl = _ref.publicTestUrl,
      publicTestUrl = _ref$publicTestUrl === void 0 ? '/assets/img/osu-footer-wordmark.png' : _ref$publicTestUrl,
      _ref$logoutUrl = _ref.logoutUrl,
      logoutUrl = _ref$logoutUrl === void 0 ? _utility.DEFAULT_SSO_LOGOUT_URL : _ref$logoutUrl,
      _ref$requireAuthentic = _ref.requireAuthentication,
      requireAuthentication = _ref$requireAuthentic === void 0 ? true : _ref$requireAuthentic;

  var _useState = (0, _react.useState)(),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      user = _useState2[0],
      setUser = _useState2[1];

  var _useState3 = (0, _react.useState)(_types.ConnectionState.UNKNOWN),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      state = _useState4[0],
      setState = _useState4[1];

  var _useState5 = (0, _react.useState)(),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      error = _useState6[0],
      setError = _useState6[1]; // Track an active verifyLogin promise so that we do not duplicate promises
  // if multiple components are asynchronously requesting updates at the same time


  var _useState7 = (0, _react.useState)(),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      promiseRef = _useState8[0],
      setPromiseRef = _useState8[1]; // Resolver function for the verifyLogin promise. Tracked in state so
  // it can be called externally once needed.


  var _useState9 = (0, _react.useState)(),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      setResolver = _useState10[1]; // Local poll interval. Will adjust dynamically when verifying login


  var _useState11 = (0, _react.useState)(DEFAULT_PING_INTERVAL),
      _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
      pingInterval = _useState12[0],
      setPingInterval = _useState12[1]; // Track whether a ping is currently in progress


  var _useState13 = (0, _react.useState)(false),
      _useState14 = (0, _slicedToArray2.default)(_useState13, 2),
      setPingActive = _useState14[1];
  /**
   * Refresh our connection state and user information from the API
   */


  var refresh = (0, _react.useCallback)(function () {
    console.debug('[AuthProvider:refresh] Refresh');
    setPingActive(function (prev) {
      // Skip if we're mid-ping
      if (prev) return prev;
      (0, _ping.default)(driver, publicTestUrl).then(function (res) {
        console.debug('[AuthProvider:ping] Resolve', res); // Update states with response payloads

        setState(res.state);
        setError(res.error);
        setUser(function (prev) {
          // Since user is an object, we use a deep comparison
          // to determine if it has actually changed since last time.
          // This helps us avoid changing state when there are no data changes.
          if (JSON.stringify(prev) === JSON.stringify(res.user)) {
            console.debug('using previous user');
            return prev;
          }

          console.debug('replacing user');
          return res.user;
        });

        if (res.state === _types.ConnectionState.LOGGED_IN) {
          setPromiseRef(undefined);
          setResolver(function (prev) {
            // If there was a resolver stored, execute and clear.
            if (typeof prev !== 'undefined') {
              console.debug('[AuthProvider:ping] Execute previous resolver', prev);
              prev();
            }

            return undefined;
          }); // Reset ping interval to our default settings

          setPingInterval(DEFAULT_PING_INTERVAL);
        }

        setPingActive(false);
      });
      return true;
    });
  }, [driver, publicTestUrl]); // Refresh connection information immediately on mount

  (0, _react.useEffect)(function () {
    refresh();
  }, [refresh]); // Refresh connection information on an interval.

  (0, _react.useEffect)(function () {
    console.debug('[AuthProvider] Update interval to', pingInterval);
    var handle = setInterval(refresh, pingInterval);
    return function () {
      return clearInterval(handle);
    };
  }, [pingInterval, refresh]); // Memoized context off of the user/state/error information.

  var context = (0, _react.useMemo)(function () {
    console.debug('[AuthProvider] Re-memoizing context');
    return {
      user: user,
      state: state,
      error: error,
      permissions: (user === null || user === void 0 ? void 0 : user.permissions) || [],
      can: function can(action, on) {
        if (typeof on !== 'undefined') {
          return on.policies.indexOf(action) >= 0;
        }

        return user ? user.permissions.indexOf(action) >= 0 : false;
      },
      logout: function logout() {
        setUser(undefined);
        setState(_types.ConnectionState.NOT_LOGGED_IN);
        setError(undefined);
        window.location.href = logoutUrl;
      },
      verifyLogin: function () {
        var _verifyLogin = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
          var promise;
          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!(typeof promiseRef !== 'undefined')) {
                    _context.next = 3;
                    break;
                  }

                  console.debug('[AuthProvider:verifyLogin] Return pending resolver', promiseRef);
                  return _context.abrupt("return", promiseRef);

                case 3:
                  promise = new Promise(function (resolve) {
                    console.debug('[AuthProvider:verifyLogin] Setting new resolver', resolve);
                    setPingInterval(ACTIVE_PING_INTERVAL); // The call is wrapped with a lambda because we can't just call setResolver(resolve)
                    // React will assume `resolve` is a callable that gets passed in the previous
                    // value and returns the new value. Which is incorrect usage here.

                    setResolver(function () {
                      return resolve;
                    });
                  });
                  console.debug('[AuthProvider:verifyLogin] Set refresh promise', promise);
                  setPromiseRef(promise);
                  refresh();
                  return _context.abrupt("return", promise);

                case 8:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function verifyLogin() {
          return _verifyLogin.apply(this, arguments);
        }

        return verifyLogin;
      }(),
      emulate: driver.emulate.bind(driver),
      clearEmulation: driver.clearEmulation.bind(driver)
    };
  }, [user, state, error, logoutUrl, driver, promiseRef, refresh]);
  var canShowAppContent = state === _types.ConnectionState.LOGGED_IN || !requireAuthentication && (state == _types.ConnectionState.NOT_LOGGED_IN || state === _types.ConnectionState.UNKNOWN);
  return /*#__PURE__*/_react.default.createElement(_AuthContext.default.Provider, {
    value: context
  }, state === _types.ConnectionState.UNKNOWN && requireAuthentication && /*#__PURE__*/_react.default.createElement(_LoggingIn.default, null), state === _types.ConnectionState.NOT_LOGGED_IN && requireAuthentication && /*#__PURE__*/_react.default.createElement(_LoggedOut.default, null), state === _types.ConnectionState.API_ERROR && /*#__PURE__*/_react.default.createElement(_AuthError.default, {
    error: error
  }), state === _types.ConnectionState.NETWORK_ERROR && /*#__PURE__*/_react.default.createElement(_NetworkError.default, null), canShowAppContent && children);
};

var _default = AuthProvider;
exports.default = _default;