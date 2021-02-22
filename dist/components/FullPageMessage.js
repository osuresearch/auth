"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var FullPageMessage = function FullPageMessage(_ref) {
  var title = _ref.title,
      children = _ref.children;
  // CSS is baked in for now since it's the only component with css
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      minHeight: '100vh',
      backgroundColor: '#efefef',
      textAlign: 'center',
      backgroundImage: 'url(https://orapps.osu.edu/assets/img/buckeye-leaf.png)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '80%',
      backgroundPosition: '5% 15%'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "auth-error-banner",
    style: {
      borderBottom: '10px solid #BB0000',
      backgroundImage: 'url(https://orapps.osu.edu/assets/img/grey-ohio-banner.jpg)',
      height: 175,
      backgroundPosition: 'center right',
      backgroundSize: '100% auto'
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      padding: '5% 15%'
    }
  }, /*#__PURE__*/_react.default.createElement("h1", {
    style: {
      marginBottom: '1.5rem'
    }
  }, title), children));
};

var _default = FullPageMessage;
exports.default = _default;