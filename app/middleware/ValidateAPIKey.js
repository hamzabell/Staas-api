const prisma = require('@prisma/client');

async function ValidateAPIKey(req, res, next) {
  try {
    if (!req.header('x-api-key')) {
        return res.status(401).send({
            message: "Please provide the x-api-key header"
        })
    }

    if (!req.body.deviceId) {
        return res.status(400).send({
            message: "request payload missing the device id"
        })
    }

    const apiKey = req.header('x-api-key');

    const requestingDevice = await prisma.device.findFirst({
        where: {
            id: req.body.deviceId,
            apiKey
        }
    });

    if (!requestingDevice) {
        return res.status(401).send({
            message: 'Invalid API key provided!'
        })
    }

    req.device = requestingDevice;

    next();
  } catch(err) {
    return res.status(500).send({
        message: "An Error ocurred, please try that request again!"
    })
  }
} 


module.exports = ValidateAPIKey;