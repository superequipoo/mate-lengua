// Conectores Lógicos - Comprobar respuestas

document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("btn-comprobar");
    const resultado = document.getElementById("resultado");
    if (!btn) return;

    function normalizar(texto) {
        return texto
            .toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .trim()
            .replace(/\s+/g, "");
    }

    const respuestasValidas = {
        "porlotanto": ["porlotanto", "porlotanto", "porconsiguiente", "poreso", "asique", "entonces"],
        "pero": ["pero", "sinembargo", "noobstante", "aunque", "contraste"],
        "porejemplo": ["porejemplo", "porejemplo", "como", "verbigracia"],
        "si": ["si", "siempreque", "sinoestudias"],
        "enconclusion": ["enconclusion", "enconclusion", "parafinalizar", "enresumen", "ensintesis"],
        "ademas": ["ademas", "ademas", "tambien", "asimismo", "incluso"],
        "porque": ["porque", "porque", "yaque", "puestoque", "debidoaque"],
        "aclaracion": ["aclaracion", "aclaracion", "explicacion", "aclarar"],
        "porque_pregunta": ["porque", "porque", "porque"],
        "sinembargo": ["sinembargo", "sinembargo", "noobstante", "pero", "ahorabien"]
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
            resultado.innerHTML = '<span class="ok">🎉 ¡PERFECTO! ' + correctas + '/' + total + ' ¡Ya dominas conectores!</span>';
        } else if (correctas >= total / 2) {
            resultado.innerHTML = '<span class="ok">👍 Vas bien: ' + correctas + '/' + total + ' correctas. Revisa las rojas.</span>';
        } else {
            resultado.innerHTML = '<span class="mal">💪 Tienes ' + correctas + '/' + total + '. Recuerda: Porque = causa, Por lo tanto = consecuencia.</span>';
        }
    });
});s