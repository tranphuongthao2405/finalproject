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
          { name: "Hoàng Thị Ái Liên" },
          { name: "Trịnh Minh Trang" },
          { name: "Lê Thị Hoài Thu" },
        ],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "2",
        doctor: [
          { name: "Đặng Bích Diệp" },
          { name: "Đặng Thị Lương" },
          { name: "Nguyễn Thị Kim Cúc" },
        ],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "3",
        doctor: [
          { name: "Nguyễn Quang Minh" },
          { name: "Nguyễn Minh Thu" },
          { name: "Trần Thị Huyền" },
        ],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "4",
        doctor: [
          { name: "Vũ Huy Lượng" },
          { name: "Vũ Thị Nguyệt Minh" },
          { name: "Nguyễn Thị Huyền Thương" },
        ],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "5",
        doctor: [{ name: "Phạm Thị Lan" }],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "6",
        doctor: [{ name: "Trần Hậu Khang" }, { name: "Lê Thanh Hiền" }],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "7",
        doctor: [{ name: "Nguyễn Hữu Sáu" }],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "8",
        doctor: [{ name: "Lê Hữu Doanh" }],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "9A",
        doctor: [
          { name: "Phạm Thị Loan" },
          { name: "Vũ Thị Phương Dung" },
          { name: "Nguyễn Thị Hà Minh" },
        ],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "9B",
        doctor: [
          { name: "Hoàng Thị Phượng" },
          { name: "Trịnh Thị Linh" },
          { name: "Hoàng Văn Tâm" },
        ],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "10",
        doctor: [
          { name: "Đỗ Thị Thu Hiền" },
          { name: "Nguyễn Thị Mai" },
          { name: "Thân Trọng Tùy" },
        ],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "11",
        doctor: [
          { name: "Nguyễn Thị Thanh Thùy" },
          { name: "Nguyễn Mạnh Tân" },
          { name: "Nguyễn Thùy Linh" },
        ],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "12",
        doctor: [
          { name: "Lê Huyền My" },
          { name: "Lê Hải Yến" },
          { name: "Bùi Thị Phương Minh" },
        ],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "13",
        doctor: [
          { name: "Vũ Thị Hồng Luyến" },
          { name: "Lê Thị Mai" },
          { name: "Trương Thị Huyền Trang" },
        ],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "14",
        doctor: [{ name: "Trần Cẩm Vân" }, { name: "Ngô Minh Thảo" }],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "15",
        doctor: [{ name: "Phạm Thị Thu Hương" }],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "16",
        doctor: [{ name: "Trịnh Thị Phượng" }, { name: "Nguyễn Minh Hường" }],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "17",
        doctor: [
          { name: "Vũ Thanh Tùng" },
          { name: "Đinh Hữu Nghị" },
          { name: "Hà Tuấn Minh" },
        ],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "18",
        doctor: [
          { name: "Lê Thị Xuân" },
          { name: "Nguyễn Thị Tuyến" },
          { name: "Nguyễn Thị Hà Vinh" },
        ],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "19",
        doctor: [{ name: "Phạm Thị Minh Phương" }],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "20",
        doctor: [{ name: "Quách Thị Hà Giang" }, { name: "Phạm Thị Thảo" }],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "21",
        doctor: [
          { name: "Hoàng Thị Ngọc Lý" },
          { name: "Trần Thu Hà Phương" },
          { name: "Trần Vân Anh" },
        ],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "22",
        doctor: [
          { name: "Bùi Quang Hào" },
          { name: "Phạm Đình Hòa" },
          { name: "Nguyễn Thị Hoa" },
        ],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });

      new Department({
        department: "23",
        doctor: [{ name: "Đào Hữu Ghi" }, { name: "Dương Thị Lan" }],
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
      });
    }
  });
}
