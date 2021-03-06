const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { Department } = require("./models/Department");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require("./config/key");

const mongoose = require("mongoose");
const connect = mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB connected...");
    initial();
  })
  .catch((err) => console.log(err));

app.use(cors());

// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// to get json data
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/users", require("./routes/users"));
app.use("/api/patients", require("./routes/patients"));
app.use("/api/diagnosis", require("./routes/diagnosis"));
app.use(
  "/api/diagnosis/imagingDiagnosis",
  require("./routes/imagingDiagnosis")
);
app.use(
  "/api/diagnosis/biochemicalDiagnosis",
  require("./routes/biochemicalDiagnosis")
);
app.use(
  "/api/diagnosis/fungusAndParasiteDiagnosis",
  require("./routes/fungusAndParasiteDiagnosis")
);
app.use(
  "/api/diagnosis/hematologyDiagnosis",
  require("./routes/hematologyDiagnosis")
);
app.use("/api/diagnosis/result", require("./routes/result"));

// use this to show the image you have in node js server to client (react js)
// https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use("/uploads", express.static("uploads"));
app.use("/imageProcessing", express.static("imageProcessing"));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));

  // index.html for all page routes    html or routing and naviagtion
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});

function initial() {
  Department.collection.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Department({
        department: "1",
        doctor: [
          { name: "Ho??ng Th??? ??i Li??n" },
          { name: "Tr???nh Minh Trang" },
          { name: "L?? Th??? Ho??i Thu" },
        ],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "2",
        doctor: [
          { name: "?????ng B??ch Di???p" },
          { name: "?????ng Th??? L????ng" },
          { name: "Nguy???n Th??? Kim C??c" },
        ],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "3",
        doctor: [
          { name: "Nguy???n Quang Minh" },
          { name: "Nguy???n Minh Thu" },
          { name: "Tr???n Th??? Huy???n" },
        ],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "4",
        doctor: [
          { name: "V?? Huy L?????ng" },
          { name: "V?? Th??? Nguy???t Minh" },
          { name: "Nguy???n Th??? Huy???n Th????ng" },
        ],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "5",
        doctor: [{ name: "Ph???m Th??? Lan" }],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "6",
        doctor: [{ name: "Tr???n H???u Khang" }, { name: "L?? Thanh Hi???n" }],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "7",
        doctor: [{ name: "Nguy???n H???u S??u" }],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "8",
        doctor: [{ name: "L?? H???u Doanh" }],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "9A",
        doctor: [
          { name: "Ph???m Th??? Loan" },
          { name: "V?? Th??? Ph????ng Dung" },
          { name: "Nguy???n Th??? H?? Minh" },
        ],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "9B",
        doctor: [
          { name: "Ho??ng Th??? Ph?????ng" },
          { name: "Tr???nh Th??? Linh" },
          { name: "Ho??ng V??n T??m" },
        ],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "10",
        doctor: [
          { name: "????? Th??? Thu Hi???n" },
          { name: "Nguy???n Th??? Mai" },
          { name: "Th??n Tr???ng T??y" },
        ],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "11",
        doctor: [
          { name: "Nguy???n Th??? Thanh Th??y" },
          { name: "Nguy???n M???nh T??n" },
          { name: "Nguy???n Th??y Linh" },
        ],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "12",
        doctor: [
          { name: "L?? Huy???n My" },
          { name: "L?? H???i Y???n" },
          { name: "B??i Th??? Ph????ng Minh" },
        ],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "13",
        doctor: [
          { name: "V?? Th??? H???ng Luy???n" },
          { name: "L?? Th??? Mai" },
          { name: "Tr????ng Th??? Huy???n Trang" },
        ],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "14",
        doctor: [{ name: "Tr???n C???m V??n" }, { name: "Ng?? Minh Th???o" }],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "15",
        doctor: [{ name: "Ph???m Th??? Thu H????ng" }],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "16",
        doctor: [{ name: "Tr???nh Th??? Ph?????ng" }, { name: "Nguy???n Minh H?????ng" }],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "17",
        doctor: [
          { name: "V?? Thanh T??ng" },
          { name: "??inh H???u Ngh???" },
          { name: "H?? Tu???n Minh" },
        ],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "18",
        doctor: [
          { name: "L?? Th??? Xu??n" },
          { name: "Nguy???n Th??? Tuy???n" },
          { name: "Nguy???n Th??? H?? Vinh" },
        ],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "19",
        doctor: [{ name: "Ph???m Th??? Minh Ph????ng" }],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "20",
        doctor: [{ name: "Qu??ch Th??? H?? Giang" }, { name: "Ph???m Th??? Th???o" }],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "21",
        doctor: [
          { name: "Ho??ng Th??? Ng???c L??" },
          { name: "Tr???n Thu H?? Ph????ng" },
          { name: "Tr???n V??n Anh" },
        ],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "22",
        doctor: [
          { name: "B??i Quang H??o" },
          { name: "Ph???m ????nh H??a" },
          { name: "Nguy???n Th??? Hoa" },
        ],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "23",
        doctor: [{ name: "????o H???u Ghi" }, { name: "D????ng Th??? Lan" }],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });
    }
  });
}
