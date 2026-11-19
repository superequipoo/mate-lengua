// Vocabulario por Contexto - Comprobar respuestas

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
        "aburrido": ["aburrido", "aburrido y largo", "que aburre", "aburre"],
        "contento": ["contento", "alegre", "feliz", "contento y alegre"],
        "lento": ["lento", "despacio", "lento y pesado"],
        "cansado": ["cansado", "muy cansado", "agotado", "exhausto", "muy cansado y agotado"],
        "sencilla": ["sencilla", "sencilla y pequena", "pequena", "pobre", "modesta", "sencilla y modesta"],
        "connotativo": ["connotativo", "connotativo", "sentido connotativo", "figurado"],
        "contexto": ["contexto", "usar el contexto", "usar contexto", "el contexto", "leer el contexto", "ver el contexto"]
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
            resultado.innerHTML = '<span class="ok">🎉 ¡PERFECTO! ' + correctas + '/' + total + ' ¡Ya dominas vocabulario en contexto!</span>';
        } else if (correctas >= total / 2) {
            resultado.innerHTML = '<span class="ok">👍 Vas bien: ' + correctas + '/' + total + ' correctas. Revisa las rojas.</span>';
        } else {
            resultado.innerHTML = '<span class="mal">💪 Tienes ' + correctas + '/' + total + '. Recuerda: Tapa la palabra y pon la tuya.</span>';
        }
    });
});