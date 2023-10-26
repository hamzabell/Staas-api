const SignIn = {
    tags: ['Attendance'],
    description: 'sign in for the day',
    operationId: 'signInDeviceSchema',
    security: [
        {
            apiKey: []
        }
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/SignInDeviceSchema'
                },
            },
        },
        required: true
    },
    responses: {
        
    }
}


const SignInDeviceSchema = {
    type: 'object',
    properties: {
        long: {
            type: "string"
        },
        lat: {
            type: "string"
        },
        deviceId: {
            type: "string"
        },
        timeIn: {
            type: "string"
        },
        shiftId: {
            type: "string"
        }

    }
}


const SignOut = {
    tags: ['Attendance'],
    description: 'sign out for the day',
    operationId: 'signOutDevice',
    security: [
        {
            apiKey: {
                type: 'apiKey',
                name: 'x-api-key',
                in: "header"
            }
        }
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/SignOutDevice'
                },
            },
        },
        required: true
    },
    responses: {
        
    }
}

module.exports = {
    SignIn,
    SignInDeviceSchema
}