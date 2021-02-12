"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMockIdentity = getMockIdentity;

function getMockIdentity() {
  return {
    name: 'Chase',
    id: '200275154',
    email: 'mcmanning.1@osu.edu',
    username: 'mcmanning.1',
    emulation: {
      active: false,
      allowed: true
    },
    permissions: ['emulate', 'foo.bar', 'fizz.buzz'],
    policies: ['fooPolicy', 'barPolicy']
  };
}