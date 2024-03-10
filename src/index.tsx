import { Hono } from "hono";
import { renderer } from "./renderer";

const app = new Hono();

app.get("*", renderer);

app.get("/", (c) => {
  return c.render(<h1>Hello!</h1>);
});

app.get("/preview", (c) => {
  return c.render(<h1>This is a preview branch</h1>);
});

export default app;
