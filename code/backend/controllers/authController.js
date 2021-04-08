const config = require("../config/authconfig");
const db = require("../models");
const { User } = db.user;
const { Role } = db.role;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, salt),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "Đăng ký tài khoản thành công!" });
          });
        }
      );
    } else {
      res.status(400).send({ message: "Vui lòng chọn chức vụ của mình" });
      return;
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "Không tìm thấy người dùng" });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res
          .status(401)
          .send({ accessToken: null, message: "Sai mật khẩu" });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400,
      });

      const authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
      });
    });
};
