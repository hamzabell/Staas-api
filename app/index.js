const express  = require('express');
const bodyParser = require('body-parser');
const Queue = require('bull');
const onboardingRoutes = require('./routes/onboardingRoutes.js')
const attendanceRoutes = require('./routes/AttendanceRoutes.js');
require('dotenv').config()
const cors = require('cors');

const EmailQueue = new Queue('email-queue', process.env.REDIS_URL);


const app = express();

app.use(bodyParser.json());
app.use(cors());


app.get('/api/health-check', (req, res) => res.status(200).send({ message: "health check successful"}))
app.use('/api/onboarding', onboardingRoutes);

app.use('/api/attendance', attendanceRoutes);


EmailQueue.process(async job  => {
    console.log(`Processing a new job with id ${job.id}`, job.data);

    return Promise.resolve();
})



module.exports = {
    app, 
    EmailQueue
}