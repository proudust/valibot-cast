import { assertEquals } from "jsr:@std/assert";
import { asBoolean } from "./as_boolean.ts";
import { parse } from "@valibot/valibot";

interface TestValue {
  input: unknown;
  result: boolean;
}

Deno.test("JavaScript major truthy value", () => {
  const values = [
    // https://developer.mozilla.org/en-US/docs/Glossary/Truthy
    { input: true, result: true },
    { input: {}, result: true },
    { input: [], result: true },
    { input: 42, result: true },
    { input: "0", result: true },
    // { input: "false", result: true }, // Prioritize YAML 1.1 spec
    { input: new Date(), result: true },
    { input: -42, result: true },
    { input: 12n, result: true },
    { input: 3.14, result: true },
    { input: -3.14, result: true },
    { input: Infinity, result: true },
    { input: -Infinity, result: true },
  ] as const satisfies TestValue[];

  for (const expected of values) {
    const { input } = expected;
    const result = parse(asBoolean(), expected.input);
    assertEquals({ input, result }, expected);
  }
});

Deno.test("JavaScript major falsy value", () => {
  const values = [
    // https://developer.mozilla.org/en-US/docs/Glossary/Falsy
    { input: null, result: false },
    { input: undefined, result: false },
    { input: false, result: false },
    { input: NaN, result: false },
    { input: 0, result: false },
    { input: -0, result: false },
    { input: 0n, result: false },
    { input: "", result: false },
    // { input: document.all, result: false }, // Browser only
  ] as const satisfies TestValue[];

  for (const expected of values) {
    const { input } = expected;
    const result = parse(asBoolean(), expected.input);
    assertEquals({ input, result }, expected);
  }
});

Deno.test("YAML 1.1 booleans", () => {
  const values = [
    // https://yaml.org/type/bool.html
    { input: "Y", result: true },
    { input: "yes", result: true },
    { input: "Yes", result: true },
    { input: "YES", result: true },
    { input: "n", result: false },
    { input: "N", result: false },
    { input: "no", result: false },
    { input: "No", result: false },
    { input: "NO", result: false },
    { input: "true", result: true },
    { input: "True", result: true },
    { input: "TRUE", result: true },
    { input: "false", result: false },
    { input: "False", result: false },
    { input: "FALSE", result: false },
    { input: "on", result: true },
    { input: "On", result: true },
    { input: "ON", result: true },
    { input: "off", result: false },
    { input: "Off", result: false },
    { input: "OFF", result: false },
  ] as const satisfies TestValue[];

  for (const expected of values) {
    const { input } = expected;
    const result = parse(asBoolean(), expected.input);
    assertEquals({ input, result }, expected);
  }
});
