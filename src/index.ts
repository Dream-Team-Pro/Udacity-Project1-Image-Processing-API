import express from 'express';
import routes from './routes';
const app: express.Application = express();
const port: number = 3000;

// Add routes
app.use(routes); 

// Start server & check change it
app.listen(port, async (): Promise<void> => {
  const url: string = `\x1b[2mhttp://localhost:${port}\x1b[0m`;
  console.log(`Please open ${url} to review the project ...`);
});
