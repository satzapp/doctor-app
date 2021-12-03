const express = require("express");
const appointment = require("./contorller/appointments.controller");
const users = require("./contorller/users.controller");
const router = express.Router();

router.post("/user/login", users.login);
router.post("/user/registration", users.registration);

router.get("/appointment/slots", appointment.getSlots);

router.get("/appointments", appointment.appointmentList);
router.post("/appointment", (req, res) => {
  appointment.appointmentBooking(req, res);
});

module.exports = router;
