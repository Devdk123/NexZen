import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 4000);

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'nexzen-server' });
});

app.get('/', (_req, res) => {
  res.json({ message: 'NEXZEN API is running.' });
});

app.listen(port, () => {
  console.log(`NEXZEN server listening on port ${port}`);
});
