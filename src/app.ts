import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
app.set('port', process.env.PORT ?? 3000);

app.use(express.json());

export default app;
