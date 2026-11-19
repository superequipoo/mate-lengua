// Sujeto y Predicado - Comprobar respuestas
// Normaliza: minúsculas, sin acentos, sin espacios de más

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

    // Respuestas aceptadas por pregunta
    const respuestasValidas = {
        "los niños": ["los niños", "los ninos", "niños", "ninos"],
        "tácito": ["tacito", "tacito / eliptico", "eliptico", "omitido", "sujeto tacito", "sujeto eliptico"],
        "nominal": ["nominal", "predicado nominal"],
        "casa": ["casa", "la casa"],
        "compuesto": ["compuesto", "sujeto compuesto"],
        "impersonal": ["impersonal", "oracion impersonal", "sin sujeto", "no tiene sujeto"],
        "predicativo": ["predicativo", "complemento predicativo", "predicado"]
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
            resultado.innerHTML = '<span class="ok">🎉 ¡PERFECTO! ' + correctas + '/' + total + ' ¡Ya dominas sujeto y predicado!</span>';
        } else if (correctas >= total / 2) {
            resultado.innerHTML = '<span class="ok">👍 Vas bien: ' + correctas + '/' + total + ' correctas. Revisa las rojas.</span>';
        } else {
            resultado.innerHTML = '<span class="mal">💪 Tienes ' + correctas + '/' + total + '. Vuelve a leer el truco de “¿quién?” y vuelve a intentar.</span>';
        }
    });
});