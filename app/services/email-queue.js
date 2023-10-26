const Queue = require('bull');
require('dotenv/config');

const { processEmail } = require('./email-queue-consumer');

const emailQueue = new Queue("email-queue",  {
    redis: process.env.REDIS_URL
});

emailQueue.process(processEmail);

const adddEmailJob = ({ receipient, message }) => {
    emailQueue.add({ receipient, message })
}

module.exports = {
    adddEmailJob
}