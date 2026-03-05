import express from 'express';
import cors from 'cors';
import webhookRoute from './routes/webhookRoute.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api', webhookRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});