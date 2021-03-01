"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _ui = require("@ORIS/ui");

var _useIdentity2 = _interopRequireDefault(require("../hooks/useIdentity"));

var _useEmulation2 = _interopRequireDefault(require("../hooks/useEmulation"));

var _Modal = _interopRequireDefault(require("../internal/Modal"));

// PersonSearchResult is missing from the index.d.ts file for oris/ui
// This will eventually be fixed once the UI project moves to Typescript.
// @ts-ignore
;

function getEmulationHistory(localStorageKey) {
  var localStorage = window.localStorage.getItem(localStorageKey);

  if (localStorage) {
    return JSON.parse(localStorage);
  }

  return [];
}

function addToEmulationHistory(localStorageKey, value) {
  var people = getEmulationHistory(localStorageKey);
  var matches = people.filter(function (item) {
    return item.id === value.id;
  }); // If they're already in recent history, do nothing

  if (matches.length) {
    return;
  } // Insert the new person into local storage


  people.push(value); // Only show the last N individuals emulated

  if (people.length > 4) {
    people.shift();
  }

  window.localStorage.setItem(localStorageKey, JSON.stringify(people));
}

var Emulation = function Emulation(_ref) {
  var _ref$lookupEndpoint = _ref.lookupEndpoint,
      lookupEndpoint = _ref$lookupEndpoint === void 0 ? 'https://orapps.osu.edu/api/v1/person' : _ref$lookupEndpoint,
      _ref$localStorageKey = _ref.localStorageKey,
      localStorageKey = _ref$localStorageKey === void 0 ? 'emulation-history' : _ref$localStorageKey,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? 'btn btn-danger' : _ref$className;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      showModal = _useState2[0],
      setShowModal = _useState2[1];

  var _useIdentity = (0, _useIdentity2.default)(),
      user = _useIdentity.user;

  var _useEmulation = (0, _useEmulation2.default)(),
      emulate = _useEmulation.emulate,
      active = _useEmulation.active,
      allowed = _useEmulation.allowed;

  var history = getEmulationHistory(localStorageKey); // onChange handler for oris/ui Search.

  var onEmulate = function onEmulate(e) {
    var person = {
      id: e.target.value.key,
      name: e.target.value.value
    };

    if (person.id) {
      addToEmulationHistory(localStorageKey, person);
      emulate(person.id);
    }
  };

  var onClearEmulation = function onClearEmulation() {
    return emulate();
  }; // If emulation isn't available, just don't render anything at all.


  if (!allowed) return null; // Can't nest Modal inside of button - the button's onClick will fire
  // when anything is clicked in the modal - causing showModal to always be true.

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("button", {
    className: className,
    onClick: function onClick() {
      return setShowModal(true);
    }
  }, "Emulate"), /*#__PURE__*/_react.default.createElement(_Modal.default, {
    title: "Emulate",
    isOpen: showModal,
    onRequestClose: function onRequestClose() {
      return setShowModal(false);
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/_react.default.createElement(_ui.Search, {
    name: "emulate-user-lookup",
    endpoint: lookupEndpoint,
    hasClearButton: false,
    onChange: onEmulate,
    resultComponent: _ui.PersonSearchResult
  }), active && user && /*#__PURE__*/_react.default.createElement("small", {
    className: "form-text"
  }, "Currently emulating ", /*#__PURE__*/_react.default.createElement("strong", null, user.username, ". "), /*#__PURE__*/_react.default.createElement("button", {
    className: "btn-link",
    onClick: onClearEmulation
  }, "Click to clear emulation.")), /*#__PURE__*/_react.default.createElement("div", {
    className: "emulate-history"
  }, history.map(function (item) {
    return /*#__PURE__*/_react.default.createElement("span", {
      key: item.id
    }, " ", /*#__PURE__*/_react.default.createElement("a", {
      href: "#",
      className: "badge badge-secondary",
      onClick: function onClick() {
        return emulate(item.id);
      }
    }, item.name));
  })))));
};

var _default = Emulation;
exports.default = _default;