const express = require("express");
const app = express();
const mongodb = require("mongodb");
let MongoClient = mongodb.MongoClient;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let db;

MongoClient.connect("mongodb://localhost:27017", function (err, client) {
  if (err !== null) {
    console.log(err);
  } else {
    db = client.db("UniversidadDeusto");
  }
});
app.get("/api/alumnos", function (req, res) {
  db.collection("alumnos")
    .find()
    .toArray(function (err, datos) {
      if (err !== null) {
        res.send(err);
      } else {
        res.send(datos);
      }
    });
});

app.post("/api/add", function (req, res) {
    let alumno = {
      dni: req.body.dni,
      nombre: req.body.nombre,
      apellidos: req.body.apellidos,
      email:req.body.email,
    };
    console.log(alumno);
  
    db.collection("alumnos").insertOne(alumno, function (err, datos) {
      if (err !== null) {
        res.send(err);
      } else {
        db.collection("alumnos")
          .find()
          .toArray(function (err, data) {
            if (err !== null) {
              res.send(err);
            } else {
              res.send(data);
            }
          });
      }
    });
  });

  app.delete("/api/delete", function (req, res) {
    const dni = req.body.dni;
    let alumno = {
        dni: req.body.dni,
      };
    db.collection("alumnos").deleteMany(alumno, function (err, datos) {
      if (err !== null) {
        res.send(err);
      } else {
        res.send(datos);
      }
    });
  });

app.listen(3000);

