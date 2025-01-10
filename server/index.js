const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv"); //For using process.env
const statsRoutes = require('./Routes/statsRoutes');
const deviationRoutes = require('./Routes/deviationRoutes');
const fetchCryptoJob = require('./jobs/fetchCryptoJob');

dotenv.config();
const app = express();
app.use(express.json());

// Routes
app.use('/stats', statsRoutes);
app.use('/deviation', deviationRoutes);
fetchCryptoJob();
// Start Background Job
mongoose.set('strictQuery', false);
// const mongoURL = `mongodb+srv://Taransh:${process.env.MONGODB_PASSWORD}@cluster0.eq8d4zf.mongodb.net/Loginn?retryWrites=true&w=majority`;
const mongoURL = `mongodb+srv://taransh121:${process.env.MONGODB_PASSWORD}@cluster0.vj9k8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(mongoURL)
    .then(() => {
        console.log("Database connected");
    }).catch((error) => {
        console.log(error);
    });

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
