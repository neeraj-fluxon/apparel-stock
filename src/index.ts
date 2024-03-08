import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/inventory';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/inventory', router);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});