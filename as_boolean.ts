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
export type AsBooleanPipe = SchemaWithPipe<
  [UnknownSchema, TransformAction<unknown, boolean>]
>;

/**
 * Create unknown schema, and transformation action to convert input to boolean.
 *
 * @returns A unknown schema with a pipeline.
 */
export function asBoolean(): AsBooleanPipe {
  return pipe(
    unknown(),
    transform((input) => {
      switch (input) {
        case null:
        case undefined:
        case false:
        case 0:
        case -0:
        case 0n:
        case "":
        case "n":
        case "N":
        case "no":
        case "No":
        case "NO":
        case "false":
        case "False":
        case "FALSE":
        case "off":
        case "Off":
        case "OFF":
          return false;

        default:
          return !Number.isNaN(input);
      }
    }),
  );
}
