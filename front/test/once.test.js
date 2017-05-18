"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var sinon = require("sinon");
var once_1 = require("../src/once");
ava_1.default('calls the original function', function (t) {
    var callback = sinon.spy();
    var proxy = once_1.default(callback);
    proxy();
    proxy();
    t.true(callback.calledOnce);
});
