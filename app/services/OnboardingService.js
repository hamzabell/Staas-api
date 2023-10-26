const prisma = require('../prisma');
const speakeasy = require('speakeasy');
const generateApiKey = require('generate-api-key').default;
const { adddEmailJob } = require('./email-queue');


async function onboardDevice(email) {

    const [_, domain] = email.split('@');



    // verify company has an active staas subscripttion
    const company = await prisma.company.findFirst({
        where: {
            domainAddress: domain
        }
    });



    if (!company) {
        return {
            success: false,
            message: 'No such company exists!',
            data: {}
        }
    }

    // User cannot onboard more than one active device
    const device = await prisma.device.findFirst({
        where: {
            email: email,
            active: true
        }
    });


    if (device && device.active) {
        return {
            success: false,
            message: `Device: ${device.name} is currently active, Please contact company admin, if device is lost or stolen`,
            data: {}
        }
    }


    // TODO: Bug with OTP Generation

    const previousOtpRecord = await prisma.token.findFirst({
        where: {
            email: email,
            verified: false
        }
    });


    const secret = !previousOtpRecord ? speakeasy.generateSecret()['base32'] : previousOtpRecord.secret;


    const code  = speakeasy.totp({
        secret: secret,
        encoding: 'base32',
        step: 300,
        window: 5

    });

    console.log(code)


    adddEmailJob({ message:  `Your one-time password for Staas is ${code}. Code expires in 5 minutes`, receipient: email })

    await prisma.token.create({
        data: {
            secret,
            email: email,
            companyId: company.id,        }
    });


    return {
        success: true,
        message: "Please check your email for otp to complete onboarding",
        data: {}
    }
}

async function addDevice({ otp, email, name, model, platform }) {

   // check if otp generated for user is still valid
    const userOtpRecord = await prisma.token.findFirst({
        where: {
            email: email,
            verified: false
        }
    });

    if (!userOtpRecord) {
        return {
            success: false,
            message: `No User with email ${email} exists!`,
            data: {}
        }
    }

    const isValid = speakeasy.totp.verify({
        secret: userOtpRecord.secret,
        encoding: 'base32',
        token: otp,
        step: 300
    });


    if (!isValid) {
        return {
            success: false,
            message: 'OTP has expired! Please request for a new otp',
            data: {}
        }
    }


    const hasDevice = await prisma.device.findFirst({
        where: {
            email,
            active: true
        }
    });


    if (hasDevice) {
        return {
            success: false,
            message: "A device has already been added for this profile",
            data: null
        }
    }


    const apiKey = generateApiKey({ method: 'string', length: 64, prefix: "staas" });



    // create a device profile
    await prisma.device.create({
        data: {
            name,
            model, 
            platform,
            email: email,
            secret: userOtpRecord.secret,
            companyId: userOtpRecord.companyId,
            apiKey   
        }
    })


    // update otp record to verified
    await prisma.token.update({
        where: {
            id:  userOtpRecord.id
        },
        data: {
            verified: true
        }
    });


    return {
        success: true,
        message: `Device: ${name} has been successfully onboarded!`,
        data: {
            secret: userOtpRecord.secret,
            apiKey
        }
    }
}

async function deactivateDevice({ deviceId, licenseKey }) {
    const company = await prisma.company.findFirst({
        where: {
            licenseKey
        }
    });

    if (!company) {
        return {
            success: false,
            message: 'Invalid license key provided!',
            data: {}
        }
    }

    await prisma.device.update({
        where: {
            id: deviceId
        },
        data: {
            active: false
        }
    });w22

    return {
        success: true,
        message: 'Device deactivated successfully!',
        data: {}
    }

}


async function resendDeviceOTP(email) {
    const userOtpRecord = await prisma.token.findFirst({
        where: {
            email: email,
            verified: false
        }
    });

    if (!userOtpRecord) {
        return {
            success: false, 
            message: `No user with ${email} has been onboarded!`,
            data: {}
        }
    }

    const code  = speakeasy.totp({
        secret: userOtpRecord.secret,
        encoding: 'base32',
        step: 300,
    });



    adddEmailJob({ message:  `Your one-time password for Staas is ${code}. Code expires in 5 minutes`, receipient: email })

    return {
        success: true,
        message: "otp sent!",
        data: {}
    }
}


/**
 * 
 * @param {Shift[]} shifts
 * @param {Integer} companyId
 * 
 * @returns {*} response
 */
async function addCompanyShifts(shifts, companyId) {
    const failed = [];

    companyId
    Promise.all(
        shifts.map(shift => {
           prisma.shift.upsert({
                where: {
                    name: shift.name
                },
                update: {
                    ...shift
                }, 
                create: {
                    ...shift
                }
           })
        })
    )
}


module.exports = {
    onboardDevice,
    addDevice,
    deactivateDevice,
    resendDeviceOTP
}