const onboardingService = require('../services/OnboardingService.js');

async function OnboardDevice(req, res) {
    try {
        const { email } = req.body;

        const result = await onboardingService.onboardDevice(email);

        return res.status(200).send(result);
     } catch (err) {
        return res.status(500).send(err)
     }
}


async function CompleteOnboardingDevice( req, res ) {
    try 
    {
        const { otp, email, name, model, platform }  = req.body;

        const result = await onboardingService.addDevice({ otp, email, name, model, platform });

        res.status(200).send(result);
    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
}

async function ResendOTP(req, res) {
    try {
        const { email } = req.body;

        const result = await onboardingService.resendDeviceOTP(email);

        res.status(200).send(result);
    } catch (err) {
        res.status(500).send(err);
    }
}


async function DeactivateDevice(req, res) {
    try {
        const { deviceId, licenseKey } = req.body;

        const result  = await onboardingService.deactivateDevice({ deviceId, licenseKey });

        res.status(200).send(result);
    } catch (err) {
        res.status(500).send(err)
    }
}


module.exports = {
    OnboardDevice,
    CompleteOnboardingDevice,
    DeactivateDevice,
    ResendOTP
}