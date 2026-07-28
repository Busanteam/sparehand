import assert from "node:assert/strict";
import { test } from "node:test";
import {
  exGstToIncGst,
  formatAud,
  formatMoney,
  gstComponentFromEx,
  roundMoney,
} from "./gst";

test("tax 10% from ex", () => {
  assert.equal(gstComponentFromEx(100), 10);
  assert.equal(exGstToIncGst(100), 110);
});

test("custom tax rate", () => {
  assert.equal(gstComponentFromEx(100, 0), 0);
  assert.equal(exGstToIncGst(100, 0.15), 115);
});

test("roundMoney", () => {
  assert.equal(roundMoney(10.005), 10.01);
});

test("formatAud uses en-AU", () => {
  assert.match(formatAud(12.5), /\$12\.50/);
});

test("formatMoney respects currency", () => {
  const won = formatMoney(1200, { currency: "KRW", locale: "ko-KR" });
  assert.match(won, /1,?200|₩|KRW/);
});
