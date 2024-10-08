import express from 'express';
const port = 3001;
const app = express();
import cors from 'cors';
import routes from './Routes/Customer.js';
import auth_routes from './Routes/Auth.js';


app.use(cors());
app.use(express.json());
app.use('/customer', routes);
app.use('/auth', auth_routes);

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
})



