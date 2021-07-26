require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const connection = require("./db-connection");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// tester la connection avec:

// connection.connect((err) => {
//   if (err) {
//     console.log(err.message);
//   } else {
//     console.log("connected to db");
//    }
// })

app.get("/api/consoles", (req, res) => {
  const sql = "SELECT * FROM consoles";

  connection.query(sql, (err, results, fields) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(results);
    }
  });
});

app.post("/api/consoles", (req, res) => {
  const { name, manufacturer, image } = req.body;
  const sql = "INSERT INTO consoles SET ?";

  connection.query(
    sql,
    [{ name, manufacturer, image }],
    (err, results, fields) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res
          .status(201)
          .json({ id: results.insertId, name, manufacturer, image });
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
