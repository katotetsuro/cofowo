import { Hono } from "hono";
import { streamText } from "hono/streaming";
import { env } from "hono/adapter";
import { handle } from 'hono/cloudflare-pages'

const app = new Hono().basePath('/api')

type Env = {
    ENVIRONMENT: string;
};

app.get("/", (c) => {
    return c.render("Hello!");
});

app.get("/preview", (c) => {
    console.log(env<Env>(c).ENVIRONMENT);
    return c.render("This is a preview branch");
});

app.get("/streamText", (c) => {
    return streamText(c, async (stream) => {
        // Write a text with a new line ('\n').
        await stream.writeln("Hello");
        // Wait 1 second.
        await stream.sleep(1000);
        // Write a text without a new line.
        await stream.write(`Hono!`);
    });
});

export const onRequest = handle(app)
