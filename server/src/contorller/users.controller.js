const bcrypt = require("bcrypt");
const Users = require("../model/users.model");
const Validation = require("./validation.helper");
const jwt = require("jsonwebtoken");
const config = require(".././config");

module.exports = {
  login: async (req, res) => {
    const data = req.body.attributes;
    var passwordCompare = false;
    let error = await Validation.validatLogin(data);
    if (error) {
      let errors = await Validation.errorFormat(error);
      return res.status(400).send(Validation.messageFormat(errors, 400, true));
    }

    let checkUser = await Users.findOne({
      email: data.email,
      status: true,
    }).exec();

    if (checkUser) {
      var passwordCompare = await bcrypt.compareSync(
        data.password,
        checkUser.password
      );
    }

    if (passwordCompare == false) {
      return res.status(400).send(
        Validation.messageFormat(
          {
            message: "Invalid credentials",
          },
          401
        )
      );
    } else {
      return res.status(200).send(
        Validation.messageFormat({
          token: await module.exports.createToken(checkUser),
          message: "User Logged in successfully",
        })
      );
    }
  },

  createToken: async (user) => {
    let jwtOptions = {
      header: { alg: "HS256" },
      subject: "Authentication",
      expiresIn: config.SECRETE.expiry,
    };

    return await jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      config.SECRETE.key,
      jwtOptions
    );
  },

  registration: async (req, res) => {
    try {
      const bodyData = req.body.attributes;
      var response = {};
      let error = await Validation.validatRegistration(bodyData);
      if (error) {
        let errors = await Validation.messageFormat(
          Validation.errorFormat(error),
          400
        );
        return res.status(400).send(errors);
      }

      let checkEmailExists = await Users.checkEmailExists(bodyData.email);
      let checkMobileExists = await Users.checkMobileExists(bodyData.mobile);

      if (checkEmailExists) {
        response.email = "Email already exists";
      }

      if (checkMobileExists) {
        response.mobile = "Mobile already exists";
      }

      if (Object.keys(response).length) {
        return res
          .status(400)
          .send(Validation.messageFormat(response, 400, true));
      } else {
        return module.exports.createUser(bodyData, res);
      }
    } catch (err) {
      return res
        .status(500)
        .send(Validation.messageFormat(err.message, 500, true));
    }
  },

  createUser: async (req, res) => {
    const hash = await bcrypt.hashSync(req.password, 12);
    let payload = {
      fullName: req.fullName,
      email: req.email,
      mobile: req.mobile,
      role: req.role === "doctor" ? 1 : 2,
      password: hash,
      status: true,
    };

    const users = new Users(payload);
    const createdUsers = await users.save();

    if (createdUsers) {
      return res.status(200).send(
        Validation.messageFormat(
          {
            message: "User registred successfully!",
            data: {
              name: users.name,
              email: users.email,
            },
          },
          201
        )
      );
    } else {
      return res.status(500).send(
        Validation.messageFormat(
          {
            message: "Something went wrong!",
          },
          500,
          true
        )
      );
    }
  },
};
