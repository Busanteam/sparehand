import assert from "node:assert/strict";
import { test } from "node:test";
import { applyAreaToQuote, calcAreaSqm, isAreaUnit } from "./area";

test("calcAreaSqm from length x width", () => {
  assert.equal(calcAreaSqm(4, 3), 12);
});

test("calcAreaSqm prefers explicit area", () => {
  assert.equal(calcAreaSqm(4, 3, 10.5), 10.5);
});

test("isAreaUnit", () => {
  assert.equal(isAreaUnit("m²"), true);
  assert.equal(isAreaUnit("hour"), false);
});

test("applyAreaToQuote updates m2 lines only", () => {
  const next = applyAreaToQuote(
    {
      jobTitle: "Paint room",
      assumptions: [],
      notesForClient: "draft",
      lineItems: [
        {
          description: "Paint",
          quantity: 1,
          unit: "m²",
          unitPriceExGst: 25,
        },
        {
          description: "Call-out",
          quantity: 1,
          unit: "job",
          unitPriceExGst: 85,
        },
      ],
    },
    12,
  );
  assert.equal(next.lineItems[0]?.quantity, 12);
  assert.equal(next.lineItems[1]?.quantity, 1);
});
