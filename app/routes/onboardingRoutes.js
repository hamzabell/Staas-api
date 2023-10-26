const {  OnboardDevice, CompleteOnboardingDevice, ResendOTP, DeactivateDevice } = require('../controller/onboardingController');
const router = require('express').Router();

router.post('/', OnboardDevice);
router.post('/complete', CompleteOnboardingDevice);
router.post('/resend-otp', ResendOTP);
router.post('/device/deactivate', DeactivateDevice);





module.exports = router;