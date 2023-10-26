const prisma = require('../prisma');


module.exports = {
    async signInDevice({  long, lat, deviceId, timeIn, shiftId }) {
        const hasDevice = await prisma.device.findFirst({
            where: {
                id: deviceId
            }
        });

        if (!hasDevice) {
            return {
                success: false,
                message: "Device does not exist!",
                data: {}
            }
        }

        // Check if user has signed in previously
        const previousAttendance = await prisma.attendance.findFirst({
            where: {
                deviceId,
                timeIn
            }
        })
        

        if (previousAttendance) {
            return {
                success: false,
                message: "You have already signed-in",
                data: {}
            }
        }
        // Check if the user is late
        const shift  = await prisma.shift.findFirst({
            where: {
                id: shiftId
            }
        });

        const [hour, minutes] =  shift.openingTime.split(':');

        const shiftTime = new Date();

        shiftTime.setHours(parseInt(hour));
        shiftTime.setMinutes(parseInt(minutes));


        const isLate = new Date(timeIn) > shiftTime;

        await prisma.attendance.create({
            data: {
                shiftId,
                timeIn,
                lat,
                long
            }
        })


        return {
            message: "You have signed in for the day sucessfully!",
            sucess: true,
            data: {
                isLate
            }
        }
    },  

    async signOutDevice({ deviceId, timeOut, shiftId }) {
        const attendance  = await prisma.attendance.findFirst({
            where: {
                shiftId, 
                deviceId
            }
        });

        if (!attendance) {
            return {
                message: "No attendance record added!",
                status: false,
                data: {}
            }
        }

        await prisma.attendance.update({
            where: {
                id: attendance.id
            }, 
            data: {
                timeOut
            }
        });

        return {
            success: true,
            message: "You have signed out successfully!",
            data: {
                timeOut
            }
        }
    },

    async registerLateness({ deviceId, shiftId, reason }) {
        await prisma.lateness.create({
            data: {
                deviceId,
                shiftId,
                reason
            }
        });

        return  {
            success: true,
            data: {
                reason
            },
            message: "Your reason for lateness has been received!"
        }
    }
}