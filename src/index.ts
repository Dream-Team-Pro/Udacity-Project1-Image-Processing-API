import express from "express";
import routes from "./routes";
const app: express.Application = express();
const port = 3000;

// Add routes
app.use(routes);

app.listen(port, function() {
  const url = `\x1b[2mhttp://localhost:${port}\x1b[0m`;
  console.log(`Please open ${url} to review the project ...`);
});

export default app;
