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
      logoutUrl = _ref$logoutUrl === void 0 ? _utility.DEFAULT_SSO_LOGOUT_URL : _ref$logoutUrl;

  // Current connection state to the API
  var _useState = (0, _react.useState)(_types.ConnectionState.UNKNOWN),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1]; // Identity information from the API


  var _useState3 = (0, _react.useState)(),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      user = _useState4[0],
      setUser = _useState4[1]; // Track an active verifyLogin promise so that we do not duplicate promises
  // if multiple components are asynchronously requesting updates at the same time


  var _useState5 = (0, _react.useState)(),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      promiseRef = _useState6[0],
      setPromiseRef = _useState6[1]; // Resolver function for the verifyLogin promise. Tracked in state so 
  // it can be called externally once needed.


  var _useState7 = (0, _react.useState)(),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      setResolver = _useState8[1]; // Local poll interval. Will adjust dynamically when verifying login


  var _useState9 = (0, _react.useState)(DEFAULT_PING_INTERVAL),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      pingInterval = _useState10[0],
      setPingInterval = _useState10[1]; // Track whether a ping is currently in progress


  var _useState11 = (0, _react.useState)(false),
      _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
      setPingActive = _useState12[1];

  var resolvePingResponse = (0, _react.useCallback)(function (res) {
    console.debug('[AuthProvider:resolvePingResponse] Resolve ping to state', res[0]); // Update states with response payloads

    setState(res[0]);
    setUser(res[1]);
    setPingActive(false);

    if (res[0] === _types.ConnectionState.LOGGED_IN) {
      setPromiseRef(undefined);
      setResolver(function (prev) {
        // If there was a resolver stored, execute and clear.
        if (typeof prev !== 'undefined') {
          console.debug('[AuthProvider:resolvePingResponse] Execute previous resolver', prev);
          prev();
        }

        return undefined;
      }); // Reset ping interval to our default settings

      setPingInterval(DEFAULT_PING_INTERVAL);
    }
  }, []); // Trigger a refresh of our connection state

  var refresh = (0, _react.useCallback)(function () {
    console.debug('[AuthProvider:refresh] Refresh');
    setPingActive(function (prev) {
      if (prev) return prev;
      (0, _ping.default)(driver, publicTestUrl).then(resolvePingResponse);
      return true;
    });
  }, [driver, publicTestUrl, resolvePingResponse]); // Refresh connection information immediately on mount

  (0, _react.useEffect)(function () {
    refresh();
  }, [refresh]); // Refresh connection information on an interval. 
  // This is split from the refresh on mount hook because I don't want
  // to trigger an immediate refresh every time `pingInterval` is modified.

  (0, _react.useEffect)(function () {
    console.debug('[AuthProvider] Update interval to', pingInterval);
    var handle = setInterval(refresh, pingInterval);
    return function () {
      return clearInterval(handle);
    };
  }, [pingInterval, refresh]);
  /**
   * Promise that doesn't resolve until we verify that the user is logged back in.
   * 
   * If there's a verifyLogin already waiting in the app, the same promise will
   * be returned. While a verifyLogin promise is active, the ping interval will 
   * be increased to every 5 seconds until login is complete.
   */

  var verifyLogin = (0, _react.useCallback)( /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
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
            promise = new Promise(function (resolve, reject) {
              console.debug('[AuthProvider:verifyLogin] Setting new resolver', resolve);
              setPingInterval(ACTIVE_PING_INTERVAL); // The call is wrapped with a lambda because we can't just call setResolver(resolve)
              // React will assume `resolve` is a callable that gets passed in the previous 
              // value and returns the new value. Which is incorrect usage here.
              // TODO: Can't I just do setResolver(() => resolve) ? 

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
  })), [promiseRef, refresh]);
  /**
   * Remove the user's identity information and forward the application 
   * to an authentication logout URL.
   */

  var logout = function logout() {
    setUser(undefined);
    setState(_types.ConnectionState.NOT_LOGGED_IN);
    window.location.href = logoutUrl;
  };

  var context = {
    user: user,
    verifyLogin: verifyLogin,
    logout: logout,
    emulate: driver.emulate.bind(driver),
    clearEmulation: driver.clearEmulation.bind(driver),
    state: state
  };
  return /*#__PURE__*/_react.default.createElement(_AuthContext.default.Provider, {
    value: context
  }, children);
};

var _default = AuthProvider;
exports.default = _default;