// Categorías Gramaticales - Comprobar respuestas

document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("btn-comprobar");
    const resultado = document.getElementById("resultado");
    if (!btn) return;

    function normalizar(texto) {
        return texto
            .toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .trim()
            .replace(/\s+/g, " ");
    }

    const respuestasValidas = {
        "sustantivo": ["sustantivo", "nombre", "sustantivo comun", "sustantivo propio"],
        "adjetivo": ["adjetivo", "adjetivo calificativo"],
        "adverbio": ["adverbio", "adverbio de modo"],
        "determinante": ["determinante", "articulo", "artículo", "determinante articulo", "articulo definido"],
        "preposición": ["preposicion", "preposicion"],
        "conjunción": ["conjuncion", "conjuncion"],
        "interjección": ["interjeccion", "interjeccion"]
    };

    btn.addEventListener("click", function () {
        const inputs = document.querySelectorAll(".ejercicio-input");
        let correctas = 0;

        inputs.forEach(function (input) {
            const esperada = normalizar(input.dataset.respuesta || "");
            const puesta = normalizar(input.value || "");
            const validas = respuestasValidas[esperada] || [esperada];

            input.classList.remove("correcto", "incorrecto");

            if (puesta === "") {
                input.classList.add("incorrecto");
                input.placeholder = "¡Te faltó esta! Escríbela";
            } else if (validas.includes(puesta)) {
                input.classList.add("correcto");
                correctas++;
            } else {
                input.classList.add("incorrecto");
            }
        });

        const total = inputs.length;
        if (correctas === total) {
            resultado.innerHTML = '<span class="ok">🎉 ¡PERFECTO! ' + correctas + '/' + total + ' ¡Ya dominas las 9 categorías!</span>';
        } else if (correctas >= total / 2) {
            resultado.innerHTML = '<span class="ok">👍 Vas bien: ' + correctas + '/' + total + ' correctas. Revisa las rojas.</span>';
        } else {
            resultado.innerHTML = '<span class="mal">💪 Tienes ' + correctas + '/' + total + '. Recuerda: ¿Acompaña a sustantivo? Adjetivo. ¿A verbo? Adverbio.</span>';
        }
    });
});