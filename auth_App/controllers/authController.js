const User = require("../model/authModel.js");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  try {
    //   get data
    const { name, email, password, role } = req.body;

    //   chekc data is exits or not

    const existingData = await User.findOne({ email });

    if (existingData) {
      return res.status(400).json({
        success: false,
        message: "user is already exist",
      });
    }
    // hashing passsword

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "error while haisng passsword",
        error: error.message,
      });
    }

    //  entry into mongodb

    const data = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error occuring while creating signUp",
      error: error.message,
    });
  }
};

//  login

exports.login = async (req, res) => {
  try {
    //   ger data
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "please fill all tha details",
      });
    }

    //  exit user

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user is not registered",
      });
    }
    let payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };
    // comapre password
    if (await bcrypt.compare(password, user.password)) {
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      //   console.log(token);

      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        user,
        token,
      });

      //   res.status(200).json({
      //     success: true,
      //     user,
      //     token,
      //   });
    } else {
      res.status(200).json({
        success: true,
        user,
        token,
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "error while logging in",
      error: error.message,
    });
  }
};
