const cors = require("cors");
const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: "b4tca61xzzqovujaasmp-mysql.services.clever-cloud.com",
  user: "uhpat9wvruroat9b",
  password: "xr5Y3rEFsj8iw41XbWhj",
  database: "b4tca61xzzqovujaasmp",
});

app.get("/users", function (req, res) {
   
  connection.query(
    "select * from Persons ",
    function (err, result, fields) {
      console.log(err);
      console.log(result);
      console.log(fields);
      res.send(result);});
    });

    app.get("/users/:id", (req, res) => {
      const elem = req.params;
      // sql id get method
      connection.query("select * from Persons", function (err, result, fields) {
        // console.log(result);
        for (let i = 0; i < result.length; i++) {
          if (elem.id == result[i].ID) {
            res.send(result[i]);
          }
        }
      });
    })

        // app.get("/users/:id", (req, res) => {
        //     const elem = req.params;
        //       for (let i = 0; i < result.length; i++) {
        //         if (elem.id == result[i].ID) {
        //           res.send(result[i]);
        //         }
        //       }
        //     });
      


app.delete("/users/:id", (req, res) => {
    const elem = req.params.id;

    connection.query(
      `DELETE FROM Persons WHERE ID=${elem}`,
      function (err, result, fields) 
      {
        console.log(result);
        // res.send(result);
     }
    );

  });

// post method
app.post("/users", (req, res) => {
  let obj = req.body;
  console.log(obj);
    connection.query(
      `INSERT INTO Persons (ID, LastName, FirstName)
      VALUES ("${obj.id}", "${obj.name}", "${obj.surname}")`,
      function (err, result, fields) {
          res.send(result);
      }
    );
  });
        


app.listen(process.env.PORT || 3000);
