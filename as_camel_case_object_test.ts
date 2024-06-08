import { assertEquals } from "jsr:@std/assert";
import { parse } from "@valibot/valibot";
import { asNumber } from "./as_number.ts";
import { asCamelCaseObject } from "./as_camel_case_object.ts";

interface TestValue {
  input: unknown;
  result: Record<string | number | symbol, unknown>;
}

Deno.test("Any case object", () => {
  const values = [
    { input: {}, result: {} },
    { input: { fooBar: "hoge" }, result: { fooBar: "hoge" } },
    { input: { FooBar: "Hoge" }, result: { fooBar: "Hoge" } },
    { input: { FOO_BAR: "hoge" }, result: { fooBar: "hoge" } },
    { input: { "foo-bar": "hoge" }, result: { fooBar: "hoge" } },
    { input: { "FOO-BAR": "hoge" }, result: { fooBar: "hoge" } },
  ] as const satisfies TestValue[];

  for (const expected of values) {
    const { input } = expected;
    const result = parse(asCamelCaseObject(), expected.input);
    assertEquals({ input, result }, expected);
  }
});
