"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.basepath = basepath;

/**
 * Utility function to calculate the basepath of an application.
 * 
 * If PUBLIC_URL is set - great. We'll use that. Otherwise 
 * we have to assume it's on a subdirectory of the root.
 */
function basepath() {
  if (process.env.PUBLIC_URL) {
    return process.env.PUBLIC_URL;
  }

  var path = '/';
  var parts = window.location.pathname.split('/');

  if (parts.length > 1) {
    path += parts[1];
  }

  return path;
}