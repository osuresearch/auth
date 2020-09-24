"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _GraphQL = _interopRequireDefault(require("./drivers/GraphQL"));

var _JsonApi = _interopRequireDefault(require("./drivers/JsonApi"));

var _default = {
  GraphQL: _GraphQL.default,
  JsonApi: _JsonApi.default
};
exports.default = _default;