'use strict';

const helper = require('..');
const assert = require('assert').strict;

assert.strictEqual(helper(), 'Hello from helper');
console.info('helper tests passed');
