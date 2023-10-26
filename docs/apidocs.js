const { SignIn, SignInDeviceSchema } = require("./attendance");
const { 
    onboardDevice, 
    onboardNewDevice, 
    completeOnboardingDevice, 
    completeOnboaringNewDevice, 
    resendOTP, 
    deactivateDevice,
    ResendOTPSchema,
    DeactivateDeviceSchema,
    
} = require("./onboarding");

const apiDocumentation = {
    openapi: '3.0.1',
    info: {
        version: '1.3.0',
        title: "Staas API Documentation",
        description: "API Documentation for STAAS",
        termsOfService: "",
        contact: {},
        license: {},
        servers: [
            {
                url: 'http://localhost:4000/api',
                name: 'Local Server'
            }
        ],
        tags: [
            {
                name: "Onboarding"
            },
            {
                name: "Attendance"
            }
        ]
    },
    paths: {
        '/api/onboarding': {
            post: onboardDevice
        },
        '/api/onboarding/complete': {
            post: completeOnboardingDevice
        },
        '/api/onboarding/resend-otp': {
            post: resendOTP
        },
        '/api/onboarding/device/deactivate': {
            post: deactivateDevice
        },
        '/api/attendance/sign-in': {
            post: SignIn
        }

    },
    components: {
        securitySchemas: {
            apiKey: {
                type: 'apiKey',
                name: 'x-api-key',
                in: "header"
            }
        },
        schemas: {
            onboardNewDevice,
            completeOnboaringNewDevice,
            ResendOTPSchema,
            DeactivateDeviceSchema,
            SignInDeviceSchema
        }
    }
}

exports.apiDocumentation = apiDocumentation;