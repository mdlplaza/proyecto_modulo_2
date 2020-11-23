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

app.post("/api/alumnos", function (req, res) {
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

  app.delete("/api/alumnos", function (req, res) {
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

//Parte profesores//

app.get("/api/cursos", function (req, res) {
  db.collection("cursos")
    .find()
    .toArray(function (err, datos) {
      if (err !== null) {
        res.send(err);
      } else {
        res.send(datos);
      }
    });
});

app.get("/api/cursos/:curso", function (req, res) {
  const curso = req.params.curso;
  db.collection("cursos")
    .find({curso:curso})
    .toArray(function (err, datos) {
      if (err !== null) {
        res.send(err);
      } else {
        res.send(datos);
      }
    });
});


app.post("/api/cursos", function (req, res) {
  let curso = {
    curso: req.body.curso,
    descripcion: req.body.descripcion,
    duracion: req.body.duracion,
    categoria:req.body.categoria,
  };
  console.log(curso);

  db.collection("cursos").insertOne(curso, function (err, datos) {
    if (err !== null) {
      console.log(err)
      res.send(err);
    } else {
      db.collection("cursos")
        .find()
        .toArray(function (err, data) {
          if (err !== null) {
            console.log(err);
            res.send(err);
          } else {
            console.log(data);
            res.send(data);
          }
        });
    }
  });
});


app.delete("/api/cursos", function (req, res) {

  let curso = {
      curso: req.body.curso,
    };
  db.collection("cursos").deleteMany(curso, function (err, datos) {
    if (err !== null) {
      res.send(err);
    } else {
      res.send(datos);
    }
  });
});

app.listen(3000);

