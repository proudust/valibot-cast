import { assertEquals } from "jsr:@std/assert";
import { safeParse } from "@valibot/valibot";
import { asNumber } from "./as_number.ts";

type TestValue = {
  input: unknown;
  success: true;
  output: number;
} | {
  input: unknown;
  success: false;
};

Deno.test("JavaScript number like value", () => {
  const values = [
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#%E6%95%B0%E5%80%A4%E3%81%B8%E3%81%AE%E5%A4%89%E6%8F%9B
    { input: 0, success: true, output: 0 },
    { input: 1.1, success: true, output: 1.1 },
    { input: -1.1, success: true, output: -1.1 },
    { input: undefined, success: true, output: NaN },
    { input: null, success: true, output: 0 },
    { input: true, success: true, output: 1 },
    { input: false, success: true, output: 0 },
    { input: "  123\n  ", success: true, output: 123 },
    { input: "0010", success: true, output: 10 },
    { input: "+1.1", success: true, output: 1.1 },
    { input: "-1.33", success: true, output: -1.33 },
    { input: "Infinity", success: true, output: Infinity },
    { input: "-Infinity", success: true, output: -Infinity },
    { input: "", success: true, output: 0 },
    { input: "    ", success: true, output: 0 },
    { input: "1_000", success: true, output: NaN },
    { input: "1,000", success: true, output: NaN },
    { input: 9007199254740991n, success: true, output: 9007199254740991 },
    { input: Symbol.hasInstance, success: false },
    { input: {}, success: true, output: NaN },
    { input: { [Symbol.toPrimitive]: () => 1 }, success: true, output: 1 },
  ] as const satisfies TestValue[];

  for (const expected of values) {
    const { input } = expected;
    const { success, output } = safeParse(asNumber(), expected.input);
    if (expected.success) {
      assertEquals({ input, success, output }, expected);
    } else {
      assertEquals({ input, success }, expected);
    }
  }
});
