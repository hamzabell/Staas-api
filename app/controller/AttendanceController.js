const { signInDevice, signOutDevice, registerLateness } = require('../services/AttendanceService');


module.exports = {
    signIn: async (req, res) => {
        try {
            const { lat, long, deviceId, timeIn, shiftId } = req.body;

            const response = await signInDevice({ lat, long, deviceId, timeIn, shiftId });


            return res.status(200).send(response);
            
        } catch  (err) {
            return res.status(500).send({
                message: "An Error occurred! Please try again"
            })
        }
    },
    signOut: async (req, res) => {
        const { deviceId, timeOut, shiftId } = req.body;

        const response = await signOutDevice({ deviceId, shiftId, timeOut });

        return res.status(200).send(response);
    },
    late: async (req, res) => {
        const {  deviceId, shiftId, reason } = req.body;

        const response = await registerLateness({ deviceId, shiftId, reason });

        return res.status(200).send(response)
    }
}