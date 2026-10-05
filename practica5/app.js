let tarjetas = JSON.parse(localStorage.getItem("tableroKanban") || "[]");

function guardar() {
    localStorage.setItem("tableroKanban", JSON.stringify(tarjetas));

}
function pintar() {
    ["pendiente", "proceso", "terminado"].forEach((estado) =>
        document.querySelector(`#${estado}`).replaceChildren()
    );
    tarjetas.forEach((tarjeta, indice) => {
        let contenedor = document.querySelector(`#${tarjeta.estado}`);
        let elemento = document.createElement("article");
        elemento.className = "tarjeta";
        elemento.innerHTML =
            "<span></span><br><button>Avanzar</button><button>Retroceder</button><button>Eliminar</button><button>Editar</button>";
        elemento.querySelector("span").textContent = tarjeta.titulo;
        elemento.querySelectorAll("button")[0].addEventListener("click", () => {
            let estados = ["pendiente", "proceso", "terminado"];
            tarjeta.estado =
                estados[Math.min(estados.indexOf(tarjeta.estado) + 1, 2)];
            guardar();
            pintar();
        });
        //boton retroceder
        elemento.querySelectorAll("button")[1].addEventListener("click", () => {
            let estados = ["pendiente", "proceso", "terminado"];
            tarjeta.estado =
                estados[Math.min(estados.indexOf(tarjeta.estado) - 1, 0)];
            guardar();
            pintar();
        });
        elemento.querySelectorAll("button")[2].addEventListener("click", () => {
            tarjetas.splice(indice, 1);
            guardar();
            pintar();
        });
       
        contenedor.append(elemento);
    });
}

document.querySelector("#formulario").addEventListener("submit", (evento) => {
    evento.preventDefault();
    tarjetas.push(Object.fromEntries(new FormData(evento.target)));
    guardar();
    evento.target.reset();
    pintar();
});
pintar();