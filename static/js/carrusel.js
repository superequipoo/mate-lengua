document.addEventListener("DOMContentLoaded", function () {

    let indice = 0;

    const pista = document.getElementById("pista");
    const diapositivas = document.querySelectorAll(".diapositiva");
    const puntosContenedor = document.getElementById("puntos");

    const btnIzq = document.getElementById("btn-izq");
    const btnDer = document.getElementById("btn-der");

    if (!pista || !btnIzq || !btnDer || !puntosContenedor) {
        console.error("No se encontraron los elementos del carrusel");
        return;
    }

    if (diapositivas.length === 0) {
        console.error("No hay diapositivas");
        return;
    }

    function mostrarDiapositiva(n) {

        if (n < 0) {
            indice = diapositivas.length - 1;
        } else if (n >= diapositivas.length) {
            indice = 0;
        } else {
            indice = n;
        }

        pista.style.transform = `translateX(-${indice * 100}%)`;

        document.querySelectorAll(".punto").forEach((punto, i) => {
            punto.classList.toggle("activo", i === indice);
        });

        console.log("Género actual:", indice);
    }

    // Crear puntos
    diapositivas.forEach((_, i) => {

        const punto = document.createElement("span");

        punto.classList.add("punto");

        if (i === 0) {
            punto.classList.add("activo");
        }

        punto.addEventListener("click", function () {
            mostrarDiapositiva(i);
        });

        puntosContenedor.appendChild(punto);

    });

    // Botón izquierdo
    btnIzq.addEventListener("click", function () {
        mostrarDiapositiva(indice - 1);
    });

    // Botón derecho
    btnDer.addEventListener("click", function () {
        mostrarDiapositiva(indice + 1);
    });

    console.log("Carrusel funcionando correctamente");

});