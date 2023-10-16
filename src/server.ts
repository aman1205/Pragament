import express from 'express';
import mongoose from 'mongoose';
import translateRoutes from './routes/translate';
import dotenv from 'dotenv';

dotenv.config()
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://127.0.0.1:27017/translate-api';

mongoose.connect(MONGODB_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
});
const db = mongoose.connection;
db.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});


app.use(express.json());
app.use('/api', translateRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
