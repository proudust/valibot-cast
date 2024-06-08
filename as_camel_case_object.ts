import {
  custom,
  type CustomSchema,
  pipe,
  type SchemaWithPipe,
  transform,
  type TransformAction,
} from "@valibot/valibot";
import { camelCase } from "change-case/keys";

/**
 * Unknown schema with pipe type.
 */
export type AsObjectPipe = SchemaWithPipe<
  [CustomSchema<object, undefined>, TransformAction<object, object>]
>;

/**
 * Create unknown schema, and transformation action to convert input to Object.
 *
 * @returns A unknown schema with a pipeline.
 */
export function asCamelCaseObject(): AsObjectPipe {
  return pipe(
    custom<object>((input): input is object => typeof input === "object"),
    transform((input) => camelCase(input) as object),
  );
}
