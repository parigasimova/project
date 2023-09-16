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

app.get("/users", (req, res) => {
  connection.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error("Kullanıcıları getirirken hata oluştu: " + err.stack);
      res.status(500).send("Kullanıcıları getirirken hata oluştu.");
    } else {
      res.status(200).json(results);
    }
  });
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const query = "DELETE FROM users WHERE ID = ?";
  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error("İstifadəçi silinərkən problem yarandı: " + err.stack);
      res.status(500).send("Kullanıcı silinərkən xəta baş verdi.");
    } else {
      res.status(200).send("Kullanıcı başarılı bir şəkildə silindi.");
    }
  });
});

app.post("/users", (req, res) => {
  const { ad, soyad, password, adres } = req.body;
  const query =
    "INSERT INTO users (ad, soyad, password, adres) VALUES (?, ?, ?, ?)";

  connection.query(query, [ad, soyad, password, adres], (err, results) => {
    if (err) {
      console.error(
        "Yeni istifadəçi əlavə edilərkən problem yarandı: " + err.stack
      );
      res.status(500).send("Yeni istifadəçi əlavə edilərkən xəta baş verdi.");
    } else {
      res
        .status(201)
        .send("Yeni istifadəçi başarılı bir şəkildə əlavə edildi.");
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
