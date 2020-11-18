
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
                <div class="container">
                <div class="card">
                <h1 class = "h1_card">${datos[i].nombre}  ${datos[i].apellidos}</h1>
                <div class = "list_container">
                ${datos[i].dni}
                ${datos[i].email}
                <div class= "delete">
                <button onclick="borrar('${datos[i].dni}')">Borrar</button>
                </div>
                </div>
                </div>
                     
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
    const email = document.getElementById("email").value;


    const alumno = {
        dni,
        nombre,
        apellidos,
        email,

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

function borrar(dni) {
    const alumno = {
        dni
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
            console.log("delete");
            recibirAlumnos();
        });
}