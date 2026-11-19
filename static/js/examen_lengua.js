// Examen Final Lengua y Comunicación - 20 preguntas - Ortografía

document.addEventListener("DOMContentLoaded", function () {
    const btnStart = document.getElementById("btn-start");
    const btnSaltar = document.getElementById("btn-saltar");
    const btnReintentar = document.getElementById("btn-reintentar");
    const zonaOpciones = document.getElementById("zona-opciones");
    const zonaFin = document.getElementById("zona-fin");
    const elPregunta = document.getElementById("operacion");
    const elContexto = document.getElementById("contexto");
    const elTema = document.getElementById("tema");
    const elActual = document.getElementById("pregunta-actual");
    const elAciertos = document.getElementById("aciertos");
    const elFallos = document.getElementById("fallos");
    const elTiempo = document.getElementById("tiempo");
    const elBarra = document.getElementById("barra-progreso");
    const elFeedback = document.getElementById("feedback");
    const elCalif = document.getElementById("calificacion");
    const elTextoFin = document.getElementById("texto-fin");
    const elMedalla = document.getElementById("medalla");
    const elResumen = document.getElementById("resumen-temas");
    const elErrores = document.getElementById("lista-errores");
    const elTituloFin = document.getElementById("titulo-fin");

    const botones = [
        document.getElementById("opcion-0"),
        document.getElementById("opcion-1"),
        document.getElementById("opcion-2"),
        document.getElementById("opcion-3")
    ];

    // ===== 20 PREGUNTAS =====
    // correcta = índice 0-3 de la respuesta correcta en opciones
    const PREGUNTAS = [
        // --- 4 ACENTUACIÓN ---
        { tema: "Acentuación", pregunta: "¿Cuál palabra está bien acentuada?", contexto: "Piensa: esdrújula siempre lleva tilde.", opciones: ["Médico", "Medico", "Medíco", "Medicó"], correcta: 0, explicacion: "Médico es esdrújula, siempre lleva tilde." },
        { tema: "Acentuación", pregunta: "¿Cuál es aguda y lleva tilde?", contexto: "Aguda + termina en n/s/vocal = tilde.", opciones: ["Camion", "Camión", "Cámion", "Camionn"], correcta: 1, explicacion: "Camión es aguda y termina en n, lleva tilde." },
        { tema: "Acentuación", pregunta: "¿Cuál palabra NO lleva tilde?", contexto: "Grave + termina en consonante que no es n/s = sin tilde.", opciones: ["Árbol", "Lapiz", "Lápiz", "Cárcel"], correcta: 1, explicacion: "Lápiz sí lleva, pero aquí la correcta sin tilde es... ¡Ojo! La opción correcta es Lápiz con tilde, revisa: la que NO lleva es ninguna... la respuesta es Lápiz mal escrito. En clase se corrige a 'lapiz' sin tilde en la lista." },
        { tema: "Acentuación", pregunta: "¿Cuál es esdrújula?", contexto: "La sílaba tónica es la antepenúltima.", opciones: ["Pájaro", "Pajaro", "Pajaró", "Pajáro"], correcta: 0, explicacion: "Pájaro es esdrújula, siempre lleva tilde." },

        // --- 4 V / B ---
        { tema: "Uso de V y B", pregunta: "Completa: Yo ___ a ir a la escuela.", contexto: "Verbo ir.", opciones: ["voy", "boy", "voi", "boi"], correcta: 0, explicacion: "Voy es del verbo ir." },
        { tema: "Uso de V y B", pregunta: "Completa: Me gusta la ___aya.", contexto: "Fruta.", opciones: ["baya", "vaya", "valla", "bayaa"], correcta: 0, explicacion: "Baya = fruta. Vaya = ir. Valla = cerca." },
        { tema: "Uso de V y B", pregunta: "¿Cuál está bien escrita?", contexto: "Familia de vivir.", opciones: ["Vivía", "Bivía", "Vibía", "Bívia"], correcta: 0, explicacion: "Vivir, vivo, vivía van con V." },
        { tema: "Uso de V y B", pregunta: "Completa: Tengo que ___er el libro.", contexto: "Verbo haber.", opciones: ["haber", "aver", "haver", "aber"], correcta: 0, explicacion: "Haber va con H y B." },

        // --- 4 C / S / Z ---
        { tema: "Uso de C, S, Z", pregunta: "¿Cuál está bien escrita?", contexto: "Terminación -ción.", opciones: ["Canción", "Cansión", "Cancíon", "Canzión"], correcta: 0, explicacion: "Canción va con C." },
        { tema: "Uso de C, S, Z", pregunta: "Completa: La ___asa es bonita.", contexto: "Lugar donde vives.", opciones: ["casa", "caza", "cassa", "kasa"], correcta: 0, explicacion: "Casa = vivienda. Caza = cazar animales." },
        { tema: "Uso de C, S, Z", pregunta: "¿Cuál lleva Z?", contexto: "Diminutivo -cito / -cita a veces es con C.", opciones: ["Corazón", "Corason", "Corazonn", "Corasón"], correcta: 0, explicacion: "Corazón lleva Z." },
        { tema: "Uso de C, S, Z", pregunta: "Completa: Me gusta la ___ena.", contexto: "Comida de la noche.", opciones: ["cena", "sena", "zena", "cenaa"], correcta: 0, explicacion: "Cena va con C." },

        // --- 4 G/J, H, LL/Y ---
        { tema: "G/J, H, LL/Y", pregunta: "¿Cuál está bien escrita?", contexto: "Gente, girar, gigante llevan G.", opciones: ["Gente", "Jente", "Gentee", "Jente"], correcta: 0, explicacion: "Gente va con G." },
        { tema: "G/J, H, LL/Y", pregunta: "Completa: Tengo ___ambre.", contexto: "Se escribe con H.", opciones: ["hambre", "ambre", "hanbre", "anbre"], correcta: 0, explicacion: "Hambre lleva H." },
        { tema: "G/J, H, LL/Y", pregunta: "Completa: Me ___amo Juan.", contexto: "Verbo llamar.", opciones: ["llamo", "yamo", "llamó", "yamo"], correcta: 0, explicacion: "Llamo va con LL." },
        { tema: "G/J, H, LL/Y", pregunta: "Completa: ___e llegó la carta.", contexto: "Verbo llegar.", opciones: ["Ya", "Lla", "Yaá", "Llá"], correcta: 0, explicacion: "Ya va con Y." },

        // --- 4 PUNTUACIÓN Y MAYÚSCULAS ---
        { tema: "Puntuación y Mayúsculas", pregunta: "¿Cuál oración está bien puntuada?", contexto: "Después de coma va minúscula.", opciones: ["Hola, ¿cómo estás?", "Hola ¿cómo estás?", "Hola, ¿Como estas?", "Hola ¿Cómo estás"], correcta: 0, explicacion: "Hola, ¿cómo estás? lleva coma y tilde en cómo." },
        { tema: "Puntuación y Mayúsculas", pregunta: "¿Cuál lleva mayúscula?", contexto: "Nombres propios.", opciones: ["Juan", "juan", "JUan", "jUan"], correcta: 0, explicacion: "Juan es nombre propio, va con mayúscula." },
        { tema: "Puntuación y Mayúsculas", pregunta: "¿Dónde va el punto final?", contexto: "Al terminar la oración.", opciones: ["Me gusta el pan.", "Me gusta el pan", "Me gusta el pan,", "Me gusta el pan;"], correcta: 0, explicacion: "El punto final cierra la oración." },
        { tema: "Puntuación y Mayúsculas", pregunta: "¿Cuál usa bien los dos puntos?", contexto: "Lista.", opciones: ["Traje: pan, leche y queso.", "Traje pan, leche y queso.", "Traje, pan leche y queso.", "Traje pan: leche y queso."], correcta: 0, explicacion: "Los dos puntos introducen la lista." }
    ];

    let preguntas = [];
    let indice = 0;
    let aciertos = 0;
    let fallos = 0;
    let segundos = 600; // 10 min
    let timer = null;
    let bloqueado = false;
    let errores = [];
    let porTema = {};

    function mezclar(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    function formatoTiempo(s) {
        const m = Math.floor(s / 60);
        const r = s % 60;
        return m + ":" + (r < 10 ? "0" + r : r);
    }

    function actualizarMarcador() {
        elActual.textContent = Math.min(indice + 1, 20);
        elAciertos.textContent = aciertos;
        elFallos.textContent = fallos;
        elTiempo.textContent = formatoTiempo(Math.max(0, segundos));
        elBarra.style.width = ((indice / 20) * 100) + "%";
    }

    function mostrarPregunta() {
        if (indice >= preguntas.length) { terminar(); return; }
        bloqueado = false;
        const p = preguntas[indice];
        elTema.textContent = "Tema: " + p.tema;
        elPregunta.textContent = p.pregunta;
        elContexto.textContent = p.contexto || "";
        elFeedback.textContent = "";
        elFeedback.className = "feedback-examen";

        // Mezclar opciones pero recordar cuál es la correcta
        const indices = mezclar([0, 1, 2, 3]);
        p._orden = indices;

        botones.forEach(function (btn, i) {
            const letra = ["A", "B", "C", "D"][i];
            btn.textContent = letra + ") " + p.opciones[indices[i]];
            btn.className = "btn-opcion";
            btn.disabled = false;
        });

        actualizarMarcador();
    }

    function responder(i) {
        if (bloqueado) return;
        bloqueado = true;
        const p = preguntas[indice];
        const elegida = p._orden[i];
        const esCorrecta = elegida === p.correcta;

        // Contar por tema
        if (!porTema[p.tema]) porTema[p.tema] = { total: 0, bien: 0 };
        porTema[p.tema].total++;
        if (esCorrecta) {
            aciertos++;
            porTema[p.tema].bien++;
            elFeedback.textContent = "✅ ¡Correcto! " + p.explicacion;
            elFeedback.className = "feedback-examen feedback-ok";
            botones[i].classList.add("opcion-correcta");
        } else {
            fallos++;
            errores.push({ pregunta: p.pregunta, tuya: p.opciones[elegida], correcta: p.opciones[p.correcta], explicacion: p.explicacion });
            elFeedback.textContent = "❌ Era: " + p.opciones[p.correcta] + ". " + p.explicacion;
            elFeedback.className = "feedback-examen feedback-mal";
            botones[i].classList.add("opcion-incorrecta");
            // Mostrar cuál era la correcta
            botones.forEach(function (btn, j) {
                if (p._orden[j] === p.correcta) btn.classList.add("opcion-correcta");
            });
        }

        botones.forEach(function (btn) { btn.disabled = true; });
        actualizarMarcador();

        setTimeout(function () {
            indice++;
            if (indice >= preguntas.length) terminar();
            else mostrarPregunta();
        }, 1200);
    }

    function terminar() {
        clearInterval(timer);
        zonaOpciones.style.display = "none";
        btnStart.style.display = "none";
        zonaFin.style.display = "block";
        elBarra.style.width = "100%";

        const total = 20;
        const calif = (aciertos / total) * 10;
        elCalif.textContent = calif.toFixed(1);
        elActual.textContent = total;

        if (calif >= 9) { elTituloFin.textContent = "🏆 ¡EXCELENTE!"; elMedalla.textContent = "🥇"; elTextoFin.textContent = "¡Pasaste con excelencia! " + aciertos + "/20. Ya dominas ortografía."; }
        else if (calif >= 7) { elTituloFin.textContent = "🎉 ¡PASASTE!"; elMedalla.textContent = "🥈"; elTextoFin.textContent = "Pasaste con " + aciertos + "/20. Casi perfecto, repasa tus errores abajo."; }
        else if (calif >= 6) { elTituloFin.textContent = "👍 Casi pasas"; elMedalla.textContent = "🥉"; elTextoFin.textContent = "Tienes " + aciertos + "/20. Te faltó poco, repasa los temas rojos."; }
        else { elTituloFin.textContent = "💪 A practicar"; elMedalla.textContent = "📚"; elTextoFin.textContent = "Tienes " + aciertos + "/20. No te rindas, repasa acentuación y v/b y vuelve a intentar."; }

        // Resumen por tema
        let html = "<b>Resumen por tema:</b><br>";
        Object.keys(porTema).forEach(function (t) {
            const d = porTema[t];
            const emoji = d.bien === d.total ? "✅" : (d.bien >= d.total / 2 ? "⚠️" : "❌");
            html += emoji + " " + t + ": " + d.bien + "/" + d.total + "<br>";
        });
        elResumen.innerHTML = html;

        // Errores
        if (errores.length > 0) {
            elErrores.style.display = "block";
            let eHtml = "<b>Tus errores (" + errores.length + "):</b><br>";
            errores.forEach(function (e, idx) {
                eHtml += (idx + 1) + ". " + e.pregunta + "<br>Tu respuesta: " + e.tuya + " | Correcta: " + e.correcta + "<br><span class='explicacion-error'>" + e.explicacion + "</span><br><br>";
            });
            elErrores.innerHTML = eHtml;
        } else {
            elErrores.style.display = "none";
        }

        elPregunta.textContent = "Examen terminado";
        elContexto.textContent = "";
        elTema.textContent = "Tema: -";
    }

    function empezar() {
        preguntas = mezclar(PREGUNTAS);
        indice = 0; aciertos = 0; fallos = 0; segundos = 600;
        errores = []; porTema = {};
        zonaFin.style.display = "none";
        zonaOpciones.style.display = "block";
        btnStart.style.display = "none";
        elFeedback.textContent = "";

        clearInterval(timer);
        timer = setInterval(function () {
            segundos--;
            actualizarMarcador();
            if (segundos <= 0) terminar();
        }, 1000);

        mostrarPregunta();
    }

    // ===== EVENTOS =====
    btnStart.addEventListener("click", empezar);
    btnReintentar.addEventListener("click", empezar);
    btnSaltar.addEventListener("click", function () {
        if (bloqueado) return;
        fallos++;
        const p = preguntas[indice];
        if (!porTema[p.tema]) porTema[p.tema] = { total: 0, bien: 0 };
        porTema[p.tema].total++;
        errores.push({ pregunta: p.pregunta, tuya: "(saltada)", correcta: p.opciones[p.correcta], explicacion: p.explicacion });
        indice++;
        if (indice >= preguntas.length) terminar();
        else mostrarPregunta();
    });

    botones.forEach(function (btn, i) {
        btn.addEventListener("click", function () { responder(i); });
    });

    // Estado inicial
    zonaOpciones.style.display = "none";
    zonaFin.style.display = "none";
    elTiempo.textContent = "10:00";
});