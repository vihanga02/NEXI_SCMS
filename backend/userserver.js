import express from 'express';
const port = 3002;
const app = express();
import cors from 'cors';
import router from './Routes/Index.js';

app.use(cors());
app.use(express.json());

app.use('/nexi', router);


app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
})
