const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.auth = (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === "admin" ? false : true,
    isAuth: true,
    email: req.user.email,
    firstname: req.user.firstname,
    lastname: req.user.lastname,
    role: req.user.role,
    department: req.user.department,
  });
};

exports.register = (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
};

exports.login = (req, res) => {
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
};

exports.logout = (req, res) => {
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
};

exports.updateInformation = async (req, res) => {
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

  if (req.body.firstname) {
    filterUpdate.firstname = req.body.firstname;
  }

  if (req.body.lastname) {
    filterUpdate.lastname = req.body.lastname;
  }

  if (req.body.role) {
    filterUpdate.role = req.body.role;
  }

  if (req.body.department) {
    filterUpdate.department = req.body.department;
  }

  try {
    const doc = await User.findOneAndUpdate(
      { _id: req.body.userId },
      filterUpdate,
      { new: true }
    );
    return res.status(200).json({ success: true, doc });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
};

exports.getAllUsers = (req, res) => {
  User.find({}).exec((err, users) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({ success: true, users });
  });
};

exports.getUserById = (req, res) => {
  User.find({
    _id: req.query.id,
  }).exec((err, user) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({ success: true, user });
  });
};

exports.deleteUserById = (req, res) => {
  User.deleteOne({ _id: req.query.id }, (err, result) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({ success: true, result });
  });
};
