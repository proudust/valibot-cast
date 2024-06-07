import { assertEquals } from "jsr:@std/assert";
import { parse } from "@valibot/valibot";
import { asNumber } from "./as_number.ts";

interface TestValue {
  input: unknown;
  result: number;
}

Deno.test("JavaScript number like value", () => {
  const values = [
    { input: -1.1, result: -1.1 },
    { input: 0, result: 0 },
    { input: 1.1, result: 1.1 },
    { input: null, result: 0 },
    { input: true, result: 1 },
    { input: false, result: 0 },
    { input: "", result: 0 },
    { input: "-1.000", result: -1 },
    { input: "1,000", result: NaN },
    { input: "1", result: 1 },
  ] as const satisfies TestValue[];

  for (const expected of values) {
    const { input } = expected;
    const result = parse(asNumber(), expected.input);
    assertEquals({ input, result }, expected);
  }
});
