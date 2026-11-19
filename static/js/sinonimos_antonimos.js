// Sinónimos y Antónimos - Comprobar respuestas

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
        "pasajero": ["pasajero", "fugaz", "efimero", "que dura poco", "temporal", "transitorio"],
        "arrogante": ["arrogante", "altiva", "altivo", "soberbia", "soberbio", "presumida"],
        "opaco": ["opaco", "oscuro", "no transparente", "turbio"],
        "paronimos": ["paronimos", "paronimas", "paronimo", "palabras paronimas"],
        "breve": ["breve", "conciso", "corto", "breve y conciso"],
        "exacerbar": ["exacerbar", "empeorar", "agravar", "intensificar"],
        "complementario": ["complementario", "complementarios", "complementaria"],
        "homofonas": ["homofonas", "homofona", "homofono", "homofonos", "palabras homofonas"],
        "raro": ["raro", "extrano", "insolito", "inusual", "extraño"]
    };

    btn.addEventListener("click", function () {
        const inputs = document.querySelectorAll(".ejercicio-input");
        let correctas = 0;

        inputs.forEach(function (input) {
            const esperada = normalizar(input.dataset.respuesta || "");
            const puesta = normalizar(input.value || "");
            const validas = respuestasValidas[esperada] || [esperada];
            input.classList.remove("correcto", "incorrecto");

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
            resultado.innerHTML = '<span class="ok">🎉 ¡PERFECTO! ' + correctas + '/' + total + ' ¡Ya dominas semántica!</span>';
        } else if (correctas >= total / 2) {
            resultado.innerHTML = '<span class="ok">👍 Vas bien: ' + correctas + '/' + total + ' correctas. Revisa las rojas.</span>';
        } else {
            resultado.innerHTML = '<span class="mal">💪 Tienes ' + correctas + '/' + total + '. Recuerda: Sustituye en la oración, no busques perfecto.</span>';
        }
    });
});