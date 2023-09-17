import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import cors from "cors";
import bodyParser from 'body-parser';
import todoRouter from './routes/toDoRoutes.js';

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cookieParser(process.env.JWT_SECRET));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
  
const link1 = "https://unique-tulumba-640d05.netlify.app"
const link2 = "http://localhost:3000"
const corsOptions = {
  origin: {link1, link2},
  credentials: true, // Allow cookies to be sent with requests
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Include PUT in the list of allowed methods
};

app.use(cors(corsOptions));




app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/users', userRoutes);
app.use("/todo",todoRouter)

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(notFound);
app.use(errorHandler);



app.listen(port, () => console.log(`Server started on port ${port}`));
