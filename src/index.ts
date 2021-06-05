import { config } from 'dotenv';
import express from 'express';
import routes from './routes';

const app = express();

config();

const port = 5000 || process.env.PORT;

/* ---------- MIDDLEWARE ---------- */
app.use(urlencoded({ extended: false }));
app.use(json());

/* ---------- ROUTES ---------- */
app.use(routes);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
