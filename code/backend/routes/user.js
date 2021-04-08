const { authJwt } = require("../middleware");
const userController = require("../controllers/userController");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", userController.allAccess);

  app.get(
    "/api/test/admin",
    [authJwt.isAdmin, authJwt.verifyToken],
    userController.adminBoard
  );

  app.get(
    "/api/test/laboratoryStaff",
    [authJwt.verifyToken],
    userController.laboratoryStaff
  );

  app.get(
    "/api/test/doctor",
    [authJwt.verifyToken],
    userController.doctorBoard
  );
};
