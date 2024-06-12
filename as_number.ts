import {
  _addIssue,
  type BaseIssue,
  type BaseSchema,
  type Dataset,
  type ErrorMessage,
} from "@valibot/valibot";

/**
 * Transformation number issue type.
 */
export interface AsNumberIssue extends BaseIssue<number> {
  /**
   * The issue kind.
   */
  readonly kind: "schema";

  /**
   * The issue type.
   */
  readonly type: "as_number";

  /**
   * The expected property.
   */
  readonly expected: "as_number";
}

/**
 * Transformation number schema type.
 */
export interface AsNumberSchema<
  TMessage extends ErrorMessage<AsNumberIssue> | undefined,
> extends BaseSchema<number, number, AsNumberIssue> {
  /**
   * The schema type.
   */
  readonly type: "as_number";

  /**
   * The schema reference.
   */
  readonly reference: typeof asNumber;

  /**
   * The expected property.
   */
  readonly expects: "numeric_value";

  /**
   * The error message.
   */
  readonly message: TMessage;
}

/**
 * Creates a transformation number schema.
 *
 * @returns A number schema.
 */
export function asNumber(): AsNumberSchema<undefined>;

/**
 * Creates a transformation number schema.
 *
 * @param message The error message.
 *
 * @returns A number schema.
 */
export function asNumber<
  const TMessage extends ErrorMessage<AsNumberIssue> | undefined,
>(message: TMessage): AsNumberSchema<TMessage>;

/**
 * Creates a transformation number schema.
 *
 * @returns A unknown schema with a pipeline.
 */
export function asNumber(message?: ErrorMessage<AsNumberIssue>): AsNumberSchema<
  ErrorMessage<AsNumberIssue> | undefined
> {
  return {
    kind: "schema",
    type: "as_number",
    reference: asNumber,
    expects: "numeric_value",
    async: false,
    message,
    _run(dataset, config) {
      // Symbol: a TypeError is thrown
      // NaN: not allowed in numeric schema
      if (typeof dataset.value !== "symbol") {
        const value = Number(dataset.value);
        if (!Number.isNaN(value)) {
          dataset.typed = true;
          dataset.value = value;
        } else {
          _addIssue(this, "type", dataset, config);
        }
      } else {
        _addIssue(this, "type", dataset, config);
      }
      return dataset as Dataset<number, AsNumberIssue>;
    },
  };
}
