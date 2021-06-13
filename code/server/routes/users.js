const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === "admin" ? false : true,
    isAuth: true,
    email: req.user.email,
    firstname: req.user.firstname,
    lastname: req.user.lastname,
    role: req.user.role,
    department: req.user.department
  });
});

router.post("/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found",
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "Wrong password" });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("w_authExp", user.tokenExp);
        res.cookie("w_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "", tokenExp: "" },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

router.post('/updateInformation', auth, async (req, res) => {
  const filterUpdate = {};

  // only update fields with value not null
  if (req.body.email) {
    filterUpdate.email = req.body.email;
  }

  if (req.body.password) {
    let hashPassword;

    try {
      hashPassword = await bcrypt.hash(req.body.password, saltRounds);
    } catch (err) {
      return res.status(400).json({ success: false, err });
    }

    filterUpdate.password = hashPassword;
  }

  if (req.body.firstName) {
    filterUpdate.firstname = req.body.firstName;
  }

  if (req.body.lastName) {
    filterUpdate.lastname = req.body.lastName;
  }

  try {
    const doc = await User.findOneAndUpdate({ _id: req.body.userId },
      filterUpdate, { new: true });
    return res.status(200).json({ success: true, doc });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
});

router.get("/getAllUsers", auth, (req, res) => {
  User.find({})
    .exec((err, users) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }

      return res.status(200).json({ success: true, users });
    });
});

module.exports = router;
