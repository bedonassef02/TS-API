import express, {request} from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRouter from "./routes/UserRouter";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(bodyParser.json());

app.use('/', userRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
