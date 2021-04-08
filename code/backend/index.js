const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const { Role } = db.role;
const dbConfig = require("./config/dbconfig");
const { Department } = db.department;
const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

db.mongoose
  .connect(
    `mongodb+srv://${dbConfig.username}:${dbConfig.password}@cluster0.mfmci.mongodb.net/${dbConfig.database}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to hospital management application." });
});

// routes
require("./routes/auth")(app);
require("./routes/user")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.collection.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "Admin",
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }

        console.log("Added 'Admin' to roles collection");
      });

      new Role({
        name: "Laboratory staff",
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }

        console.log("Added 'Laboratory staff' to roles collection");
      });

      new Role({
        name: "Doctor",
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }

        console.log("Added 'Doctor' to roles collection");
      });
    }
  });

  Department.collection.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Department({
        name: "Examination department",
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }

        console.log("Added 'Examination department' to department collection");
      });

      new Department({
        name: "Women and children's skin treatment department",
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }

        console.log(
          "Added 'Women and children's skin treatment department' to department collection"
        );
      });

      new Department({
        name: "Men's skin treatment department",
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }

        console.log(
          "Added 'Men's skin treatment department' to department collection"
        );
      });

      new Department({
        name: "Laser and skin care department",
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }

        console.log(
          "Added 'Laser and skin care department' to department collection"
        );
      });

      new Department({
        name: "Plastic surgery and rehabilitation department",
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }

        console.log(
          "Added 'Plastic surgery and rehabilitation department' to department collection"
        );
      });

      new Department({
        name: "Stem cell research and application technology department",
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }

        console.log(
          "Added 'Stem cell research and application technology department' to department collection"
        );
      });

      new Department({
        name: "Diagnostic imaging department",
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }

        console.log(
          "Added 'Diagnostic imaging department' to department collection"
        );
      });

      new Department({
        name: "Laboratory department (Hematology , Biochemistry)",
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }

        console.log(
          "Added 'Laboratory department (Hematology , Biochemistry)' to department collection"
        );
      });

      new Department({
        name: "Immunology and molecular pathology department",
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }

        console.log(
          "Added 'Immunology and molecular pathology department' to department collection"
        );
      });

      new Department({
        name: "Microbiology department",
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }

        console.log(
          "Added 'Microbiology department' to department collection"
        );
      });
    }
  });
}
