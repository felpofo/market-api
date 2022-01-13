"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.success = exports.error = exports.warn = exports.info = void 0;
require("colors");
function info(message) {
    console.log(`[ ${"INFO".cyan} ] ${message}`);
}
exports.info = info;
function warn(message) {
    console.log(`[ ${"WARN".cyan} ] ${message}`);
}
exports.warn = warn;
function error(message) {
    console.log(`[ ${"ERROR".cyan} ] ${message}`);
}
exports.error = error;
function success(message) {
    console.log(`[ ${"SUCCESS".cyan} ] ${message}`);
}
exports.success = success;
