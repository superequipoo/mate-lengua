// Objeto Directo e Indirecto - Comprobar respuestas

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
        "oi": ["oi", "o.i.", "objeto indirecto", "indirecto", "el oi"],
        "la": ["la", "la vi", "la vi a maria"],
        "dinero": ["dinero", "el dinero", "un libro", "libro"],
        "mis papás": ["mis papas", "a mis papas", "mis padres", "a mis padres", "papás", "papas", "mis papas"],
        "se lo": ["se lo", "se lo di"],
        "le": ["le", "le dije"]
    };

    // Nota: la pregunta 4 original era "dinero" pero en el HTML nuevo es "dinero"
    // Si tu pregunta 4 es otra, solo cambia data-respuesta en el HTML.

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
            resultado.innerHTML = '<span class="ok">🎉 ¡PERFECTO! ' + correctas + '/' + total + ' ¡Ya dominas lo, la, le, se!</span>';
        } else if (correctas >= total / 2) {
            resultado.innerHTML = '<span class="ok">👍 Vas bien: ' + correctas + '/' + total + ' correctas. Revisa las rojas.</span>';
        } else {
            resultado.innerHTML = '<span class="mal">💪 Tienes ' + correctas + '/' + total + '. Recuerda: ¿Qué? = lo/la. ¿A quién? = le/se.</span>';
        }
    });
});