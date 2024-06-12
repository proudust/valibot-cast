#!/usr/bin/env -S deno run --allow-net --watch

import { Hono } from "npm:hono";
import { vValidator } from "npm:@hono/valibot-validator";
import { object } from "jsr:@valibot/valibot";
import { asBoolean, asNumber } from "../../mod.ts";

const app = new Hono();

const Schema = object({
  id: asNumber(),
  agree: asBoolean(),
});

app.post("/", vValidator("form", Schema), (c) => {
  const data = c.req.valid("form");
  return c.json(data);
});

Deno.serve(app.fetch);
