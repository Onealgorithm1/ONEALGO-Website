const p = require("path-to-regexp");
const origParse = p.parse;

p.parse = function (str, options) {
  try {
    console.log(
      "path-to-regexp.parse called with:",
      JSON.stringify(str).slice(0, 200),
    );
  } catch (e) {}
  return origParse.apply(this, arguments);
};

console.log("wrapped parse");

// now require express to trigger any usage
try {
  const express = require("express");
  console.log("express loaded");
} catch (e) {
  console.error("express load failed", e && e.stack ? e.stack : e);
}
