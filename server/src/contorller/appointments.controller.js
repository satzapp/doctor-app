const Appointment = require("../model/appointments.model");
const moment = require("moment");
const Validation = require("./validation.helper");

module.exports = {
  appointmentList: async (req, res) => {
    try {
      var appointmentList;

      // fillter by date
      if (req.query.date !== undefined) {
        // date reformating
        let reqDate = moment(req.query.date).format(
          "YYYY-MM-DD[T00:00:00.000Z]"
        );
        appointmentList = await Appointment.find({ date: reqDate });
      } else {
        appointmentList = await Appointment.find();
      }

      return res.status(200).send({
        code: 200,
        errors: false,
        data: appointmentList,
      });
    } catch (err) {
      return res.status(500).send({
        code: 500,
        errors: true,
        data: {
          type: "appointment",
          attributes: err.message,
        },
      });
    }
  },

  appointmentBooking: async (req, res) => {
    try {
      let error = await Validation.validatBooking(req.body);
      if (error) {
        let errors = await Validation.errorFormat(error);
        return res.status(200).send(errors);
      }

      let payload = {
        patientName: req.body.patientName,
        age: req.body.age,
        gender: req.body.gender,
        mobile: req.body.mobile,
        date: req.body.date,
        fromTime: req.body.fromTime,
        toTime: req.body.toTime,
        status: req.body.status,
      };

      const appointment = new Appointment(payload);

      await appointment.save();

      return res.status(200).send({
        code: 200,
        errors: false,
        data: {
          attributes: {
            message: "Appointment booked successfully!",
            data: appointment,
          },
        },
      });
    } catch (err) {
      return res.status(500).send({
        code: 500,
        errors: true,
        data: {
          type: "appointment",
          attributes: err.message,
        },
      });
    }
  },

  checkBookingSlot: async (data) => {
    let checkingSlot = await Appointment.find({
      date: data.date,
      fromTime: {
        lte: data.fromTime,
        gte: data.toTime,
      },
    });
    return checkingSlot.length ? true : false;
  },

  getSlots: async (req, res) => {
    try {
      let requestedDate = req.query.date;
      let slotResonse = {
        date: requestedDate,
        m_slot: true,
        m_slot_duration: 30,
        m_time_from: "10:00",
        m_time_to: "14:00",
        e_slot: true,
        e_slot_duration: 30,
        e_time_from: "17:00",
        e_time_to: "19:00",
      };
      return res
        .status(200)
        .send(Validation.messageFormat(slotResonse, 200, false, "slots"));
    } catch (err) {
      return res.status(500).send({
        code: 500,
        errors: true,
        data: {
          type: "appointment",
          attributes: err.message,
        },
      });
    }
  },
};
