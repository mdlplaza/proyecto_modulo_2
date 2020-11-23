recibirCursos();
function recibirCursos() {
    fetch("/api/cursos")
        .then(function (res) {
            return res.json();
        })
        .then(function (datos) {
            let cursos = `
                <div class="container">
              
        <table> 
           <tr>
           <th>Curso</th>
           <th>Descripción</th>
           <th>Duración</th>
           <th>Categoria</th>
           </tr>`;
            for (let i = 0; i < datos.length; i++) {

                cursos += `<tr> 
            <td>${datos[i].curso}</td>
            <td>${datos[i].descripcion} </td>
            <td>${datos[i].duracion}</td>
            <td>${datos[i].categoria}</td>
            <td><i onclick="borrar('${datos[i].curso}')" class="fas fa-trash"></i></td>
           <td><i onclick="rellenar_datos('${datos[i].curso}')" class="far fa-edit"></i></td>
            </tr>`;
            }

            cursos += `</table>              
             </div>`;

            document.getElementById("div1").innerHTML = cursos;
        });
}

function add() {
    const nombre_curso = document.getElementById("nombre_curso").value;
    const descripcion = document.getElementById("descripcion").value;
    const duracion = document.getElementById("duracion").value;
    const categoria = document.getElementById("categoria").value;


    const curso = {
        curso: nombre_curso,
        descripcion: descripcion,
        duracion: duracion,
        categoria: categoria,
    };

    fetch("/api/cursos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(curso),
    }).then(function (res) {
        return res.json();
    })
        .then(function (datos) {
            recibirCursos();
        });

}

function borrar(curso) {

    fetch(`/api/cursos`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ curso }),
    })
        .then(function (res) {
            return res.json();
        })
        .then(function (cursos) {
            console.log("delete");
            recibirCursos();
        });
}
function rellenar_datos(curso) {

    fetch(`/api/cursos/${curso}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(),
    })
        .then(function (res) {
            return res.json();
        })
        .then(function (curso) {
            rellenar_formulario(curso[0]);
        });
}

function rellenar_formulario(curso) {
    document.getElementById("nombre_curso").value = curso.curso;
    document.getElementById("descripcion").value = curso.descripcion;
    document.getElementById("duracion").value = curso.duracion;
    document.getElementById("categoria").value = curso.categoria;
}


