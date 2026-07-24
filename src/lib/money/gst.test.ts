import assert from "node:assert/strict";
import { test } from "node:test";
import { exGstToIncGst, formatAud, gstComponentFromEx, roundMoney } from "./gst";

test("GST 10% from ex-GST", () => {
  assert.equal(gstComponentFromEx(100), 10);
  assert.equal(exGstToIncGst(100), 110);
});

test("roundMoney", () => {
  assert.equal(roundMoney(10.005), 10.01);
});

test("formatAud uses en-AU", () => {
  assert.match(formatAud(12.5), /\$12\.50/);
});
