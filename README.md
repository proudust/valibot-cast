# valibot-cast

[![JSR](https://jsr.io/badges/@proudust/valibot-cast)](https://jsr.io/@proudust/valibot-cast)

Transform and validating structural data powered by valibot.

## Use cases

### Transform untyped data

Perform type transform and validation for data without type representation such as form data and URL search parameters.

```js
import { Hono } from "npm:hono";
import { vValidator } from "npm:@hono/valibot-validator";
import { object } from "jsr:@valibot/valibot";
import { asBoolean, asNumber } from "../../mod.ts";

const app = new Hono();

const schema = object({
  id: asNumber(),
  agree: asBoolean(),
});

app.post("/", vValidator("form", schema), (c) => {
  const data = c.req.valid("form");
  return c.json(data);
});

Deno.serve(app.fetch);

// request: id=123456&agree=1
// response: { id: 123456, agree: true }

// request: id=1a2b3c&agree=n
// response: Invalid type: Expected numeric_value but received "1a2b3c"
```

### Transform Hard to use data

Transform bad structural data to make it easier to handle in JavaScript.

```js
// TODO
```
