// Polisemia y Campo Semántico - Comprobar respuestas

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
        "polisemia": ["polisemia", "polisemica", "polisemico", "es polisemia"],
        "libro": ["libro", "el libro"],
        "familia": ["familia", "familia lexica", "familia léxica", "lexica"],
        "connotacion": ["connotacion", "connotativo", "connotacion", "sentido connotativo", "figurado"],
        "doctor": ["doctor", "doctora", "enfermera", "enfermero", "paciente", "cama", "medicina", "medicamento", "hospital", "cirugia", "cirujano", "bisturi", "jeringa", "suero", "camilla"],
        "homonimia": ["homonimia", "homonimo", "homonimos", "es homonimia"],
        "campo": ["campo", "campo semantico", "campo semántico", "semantico"]
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
            resultado.innerHTML = '<span class="ok">🎉 ¡PERFECTO! ' + correctas + '/' + total + ' ¡Ya dominas polisemia!</span>';
        } else if (correctas >= total / 2) {
            resultado.innerHTML = '<span class="ok">👍 Vas bien: ' + correctas + '/' + total + ' correctas. Revisa las rojas.</span>';
        } else {
            resultado.innerHTML = '<span class="mal">💪 Tienes ' + correctas + '/' + total + '. Recuerda: Familia = misma raíz, Campo = mismo tema.</span>';
        }
    });
});