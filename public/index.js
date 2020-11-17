
recibirAlumnos();
function recibirAlumnos() {
    fetch("/api/alumnos")
        .then(function (res) {
            return res.json();
        })
        .then(function (datos) {
            let alumnos = "";
            for (let i = 0; i < datos.length; i++) {
                alumnos += `
            <div>
                <p>DNI: ${datos[i].dni}</p>
                <p>Nombre: ${datos[i].nombre}</p>
                <p>Apellidos: ${datos[i].apellidos}</p>
            </div>
        `;
            }
            document.getElementById("div1").innerHTML = alumnos;
        });
}

function add() {
    const dni = document.getElementById("dni").value;
    const nombre = document.getElementById("nombre").value;
    const apellidos = document.getElementById("apellidos").value;


    const alumno = {
        dni,
        nombre,
        apellidos,

    };

    fetch("/api/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(alumno),
    })
        .then(function (res) {
            return res.json();
        })
        .then(function (datos) {
            recibirAlumnos();
        });

    }
function borrar() {
    const dni = document.getElementById("dni").value;
    const nombre = document.getElementById("nombre").value;
    const apellidos = document.getElementById("apellidos").value;

    const alumno = {
        dni,
        nombre,
        apellidos,

    };
  
    fetch(`/api/delete/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(alumno),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (alumnos) {
        recibirAlumnos();
      });
  }