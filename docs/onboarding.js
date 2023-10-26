const onboardDevice = {
    tags: ['Onboarding'],
    description: 'Onboard a new user to a company',
    operationId: 'onboardDevice',
    security: [
        {
            bearerAuth: []
        }
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/onboardNewDevice'
                },
            },
        },
        required: true
    },
    responses: {
        
    }
}


const completeOnboardingDevice = {
    tags: ['Onboarding'],
    description: 'Complete Device onboarding',
    operationId: 'completeDeviceOnboarding',
    security: [
        {
            bearerAuth: []
        }
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/completeOnboaringNewDevice'
                },
            },
        },
        required: true
    },
    responses: {
        
    }
}


const resendOTP = {
    tags: ['Onboarding'],
    description: 'Resend OTP',
    operationId: 'resendOTP',
    security: [
        {
            bearerAuth: []
        }
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/ResendOTPSchema'
                },
            },
        },
        required: true
    },
    responses: {
        
    }
}

const deactivateDevice = {
    tags: ['Onboarding'],
    description: 'Deactivate Device',
    operationId: 'deactivateDevice',
    security: [
        {
            bearerAuth: []
        }
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/DeactivateDeviceSchema'
                },
            },
        },
        required: true
    },
    responses: {
        
    }
}




// Schemas
const onboardNewDevice = {
    type: 'object',
    properties: {
        email: {
            type: 'string',
            example: "akan@mail.com",
            required: true
        }
    }
}

const completeOnboaringNewDevice = {
    type: 'object',
    properties: {
        otp: {
            type: 'string',
            required: true
        },
        email: {
            type: 'string',
            required: true,
        },
        name: {
            type: 'string',
            required: true
        },
        model: {
            type: 'string',
            required: true,
        },
        platform: {
            type: 'string',
            required: true
        }
    }
}

const ResendOTPSchema = {
    type: 'object', 
    properties: {
        email: {
            type: 'string',
            required: true
        }
    }
}


const DeactivateDeviceSchema = {
    type: 'object',
    properties: {
        deviceId: {
            type: 'string',
            required: true
        }, 
        licenseKey: {
            type: "string",
            required: true
        }
    }
}

module.exports = { 
    onboardDevice, 
    onboardNewDevice, 
    completeOnboardingDevice, 
    completeOnboaringNewDevice,
    ResendOTPSchema,
    DeactivateDeviceSchema, 
    resendOTP,
    deactivateDevice
}