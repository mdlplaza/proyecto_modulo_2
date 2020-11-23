
recibirAlumnos();
function recibirAlumnos() {
    fetch("/api/alumnos")
        .then(function (res) {
            return res.json();
        })
        .then(function (datos) {
            let alumnos = `
                <div class="container">
              
        <table> 
           <tr>
           <th>DNI</th>
           <th>Nombre</th>
           <th>Apellidos</th>
           <th>Email</th>
           </tr>`;
            for (let i = 0; i < datos.length; i++) {
                alumnos += `
                <tr>
                    <td>${datos[i].dni}</td>
                    <td>${datos[i].nombre} </td>
                    <td>${datos[i].apellidos}</td>
                    <td>${datos[i].email}</td>
                    <td><i onclick="borrar('${datos[i].dni}')" class="fas fa-trash"></i></td>
                </tr>`;
            }

            alumnos += `
           </table >                     
             </div >

                    `;

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

    fetch("/api/alumnos", {
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

    fetch(`/api/alumnos`, {
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


