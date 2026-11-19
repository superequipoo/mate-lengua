// Inferencia - Comprobar respuestas

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
        "tarde": ["tarde", "iba tarde", "tenia prisa", "tiene prisa", "iba corriendo porque iba tarde", "llego tarde", "se le hizo tarde"],
        "fiesta": ["fiesta", "una fiesta", "fiesta en casa", "carne asada", "fiesta de carne asada"],
        "dinero": ["dinero", "no traia dinero", "no tenia dinero", "no tenia dinero para pagar", "se le olvido el dinero", "no traia dinero para pagar"],
        "cumpleaños": ["cumpleanos", "cumpleaños", "fiesta sorpresa", "fiesta de cumpleanos", "una fiesta sorpresa", "un cumpleanos"],
        "logica": ["logica", "logica pero no escrita", "es logica pero no escrita", "logica y no escrita", "deducida", "una inferencia", "algo logico"],
        "insensible": ["insensible", "no siente", "no siente empatia", "es insensible", "es frio", "es duro", "no tiene sentimientos"]
    };

    btn.addEventListener("click", function () {
        const inputs = document.querySelectorAll(".ejercicio-input");
        let correctas = 0;

        inputs.forEach(function (input) {
            const esperada = normalizar(input.dataset.respuesta || "");
            const puesta = normalizar(input.value || "");
            const validas = respuestasValidas[esperada] || [esperada];
            input.classList.remove("correcto", "incorrecto");

            // Acepta si contiene la palabra clave
            const bien = puesta !== "" && (validas.includes(puesta) || puesta.includes(esperada));

            if (puesta === "") {
                input.classList.add("incorrecto");
                input.placeholder = "¡Te faltó esta! Escríbela";
            } else if (bien) {
                input.classList.add("correcto");
                correctas++;
            } else {
                input.classList.add("incorrecto");
            }
        });

        const total = inputs.length;
        if (correctas === total) {
            resultado.innerHTML = '<span class="ok">🎉 ¡PERFECTO! ' + correctas + '/' + total + ' ¡Ya eres detective de textos!</span>';
        } else if (correctas >= total / 2) {
            resultado.innerHTML = '<span class="ok">👍 Vas bien: ' + correctas + '/' + total + ' correctas. Revisa las rojas.</span>';
        } else {
            resultado.innerHTML = '<span class="mal">💪 Tienes ' + correctas + '/' + total + '. Recuerda: Pista + lo que sabes = inferencia.</span>';
        }
    });
});