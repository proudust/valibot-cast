import {
  pipe,
  type SchemaWithPipe,
  transform,
  type TransformAction,
  unknown,
  type UnknownSchema,
} from "@valibot/valibot";

/**
 * Unknown schema with pipe type.
 */
export type AsNumberPipe = SchemaWithPipe<
  [UnknownSchema, TransformAction<unknown, number>]
>;

/**
 * Create unknown schema, and transformation action to convert input to number.
 *
 * @returns A unknown schema with a pipeline.
 */
export function asNumber(): AsNumberPipe {
  return pipe(unknown(), transform(Number));
}
