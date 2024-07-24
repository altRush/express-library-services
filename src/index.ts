import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import router from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.use('/', router);

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
