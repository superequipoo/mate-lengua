// Oración Simple y Compuesta - Comprobar respuestas

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
        "compuesta": ["compuesta", "oracion compuesta", "compuesta coordinada"],
        "coordinada": ["coordinada", "coordinada adversativa", "oracion coordinada", "compuesta coordinada"],
        "yuxtapuesta": ["yuxtapuesta", "oracion yuxtapuesta", "compuesta yuxtapuesta"],
        "2": ["2", "dos", "2 verbos", "dos verbos"],
        "subordinada": ["subordinada", "oracion subordinada", "compuesta subordinada", "subordinada adverbial", "subordinada causal"],
        "sustantiva": ["sustantiva", "subordinada sustantiva", "oracion subordinada sustantiva"],
        "adjetiva": ["adjetiva", "subordinada adjetiva", "de relativo", "subordinada de relativo", "oracion subordinada adjetiva"]
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
            resultado.innerHTML = '<span class="ok">🎉 ¡PERFECTO! ' + correctas + '/' + total + ' ¡Ya dominas oración simple y compuesta!</span>';
        } else if (correctas >= total / 2) {
            resultado.innerHTML = '<span class="ok">👍 Vas bien: ' + correctas + '/' + total + ' correctas. Revisa las rojas.</span>';
        } else {
            resultado.innerHTML = '<span class="mal">💪 Tienes ' + correctas + '/' + total + '. Recuerda: cuenta verbos, busca el nexo.</span>';
        }
    });
});