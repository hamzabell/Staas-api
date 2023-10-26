const router  = require('express').Router();

const {  signIn, signOut, late} = require('../controller/AttendanceController');

const ValidateAPIKey = require('../middleware/ValidateAPIKey');

router.post('/sign-in', ValidateAPIKey, signIn)
router.post('/sign-out', ValidateAPIKey, signOut)
router.post('/late', ValidateAPIKey, late)



module.exports = router;