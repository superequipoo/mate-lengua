// Potencias y Raíces - Paso a paso - Sin vidas, aprendes con pasos

document.addEventListener("DOMContentLoaded", function () {
    const elPracticadas = document.getElementById("practicadas");
    const elCorrectas = document.getElementById("correctas");
    const elNivel = document.getElementById("nivel");
    const elTipo = document.getElementById("tipo");
    const elInfo = document.getElementById("info-texto");
    const elOperacion = document.getElementById("operacion");
    const elPista = document.getElementById("pista");
    const zonaPasos = document.getElementById("zona-pasos");
    const listaPasos = document.getElementById("lista-pasos");
    const btnSiguientePaso = document.getElementById("btn-siguiente-paso");
    const btnVerTodos = document.getElementById("btn-ver-todos");
    const pasosContador = document.getElementById("pasos-contador");
    const zonaInput = document.getElementById("zona-input");
    const input = document.getElementById("respuesta");
    const btnComprobar = document.getElementById("btn-comprobar-respuesta");
    const btnAyuda = document.getElementById("btn-ayuda");
    const btnStart = document.getElementById("btn-start");
    const elFeedback = document.getElementById("feedback");
    const elFin = document.getElementById("fin");
    const elResultado = document.getElementById("resultado");
    const btnSiguiente = document.getElementById("btn-siguiente");

    const btnTodas = document.getElementById("btn-todas");
    const btnCuadrados = document.getElementById("btn-cuadrados");
    const btnCubos = document.getElementById("btn-cubos");
    const btnRaices = document.getElementById("btn-raices");
    const btnLeyes = document.getElementById("btn-leyes");

    let categoria = "todas";
    let practicadas = 0, correctas = 0, nivel = 1;
    let respuestaCorrecta = 0;
    let pasos = [];
    let pasoActual = 0;
    let jugando = false;

    function aleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function sup(n) {
        const mapa = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶" };
        return String(n).split("").map(c => mapa[c] || c).join("");
    }

    // ===== GENERAR EJERCICIO CON PASOS =====
    function generar() {
        let texto = "", pista = "", info = "", pasosLista = [], respuesta = 0;
        const cats = categoria === "todas" ? ["cuadrados", "cubos", "raices", "leyes"] : [categoria];
        const cat = cats[aleatorio(0, cats.length - 1)];

        if (cat === "cuadrados") {
            const a = aleatorio(3, 15);
            respuesta = a * a;
            texto = a + "² = ?";
            pista = "Cuadrado: multiplica el número por sí mismo";
            info = "Cuadrado: a² = a × a. Ejemplo: " + a + "² = " + a + " × " + a;
            pasosLista = [
                "<strong>Paso 1:</strong> ¿Qué significa ²? Multiplicar 2 veces.",
                "<strong>Paso 2:</strong> " + a + "² = " + a + " × " + a,
                "<strong>Paso 3:</strong> " + a + " × " + a + " = " + respuesta + " ✅"
            ];
        } else if (cat === "cubos") {
            const a = aleatorio(2, 6);
            respuesta = a * a * a;
            texto = a + "³ = ?";
            pista = "Cubo: multiplica el número 3 veces";
            info = "Cubo: a³ = a × a × a. Ejemplo: " + a + "³ = " + a + " × " + a + " × " + a;
            pasosLista = [
                "<strong>Paso 1:</strong> ¿Qué significa ³? Multiplicar 3 veces.",
                "<strong>Paso 2:</strong> " + a + "³ = " + a + " × " + a + " × " + a,
                "<strong>Paso 3:</strong> " + a + " × " + a + " = " + (a * a) + ", luego " + (a * a) + " × " + a + " = " + respuesta + " ✅"
            ];
        } else if (cat === "raices") {
            const a = aleatorio(3, 15);
            respuesta = a;
            texto = "√" + (a * a) + " = ?";
            pista = "Raíz: ¿qué número × sí mismo da " + (a * a) + "?";
            info = "Raíz: √" + (a * a) + " es buscar el número que multiplicado por sí mismo da " + (a * a) + ".";
            pasosLista = [
                "<strong>Paso 1:</strong> Buscamos un número que × sí mismo = " + (a * a),
                "<strong>Paso 2:</strong> Prueba con " + a + ": " + a + " × " + a + " = " + (a * a),
                "<strong>Paso 3:</strong> ¡Sí! √" + (a * a) + " = " + a + " ✅"
            ];
        } else { // leyes
            const tipoLey = aleatorio(1, 3);
            if (tipoLey === 1) {
                const base = 2, m = aleatorio(2, 4), n = aleatorio(1, 3);
                respuesta = Math.pow(base, m + n);
                texto = "2" + sup(m) + " × 2" + sup(n) + " = ?";
                pista = "Misma base y multiplica: se SUMAN los exponentes";
                info = "Ley: aᵐ × aⁿ = aᵐ⁺ⁿ. Aquí: 2" + sup(m) + " × 2" + sup(n) + " = 2" + sup(m + n);
                pasosLista = [
                    "<strong>Paso 1:</strong> Misma base (2) y multiplica → se suman exponentes.",
                    "<strong>Paso 2:</strong> 2" + sup(m) + " × 2" + sup(n) + " = 2" + sup(m) + "⁺" + sup(n) + " = 2" + sup(m + n),
                    "<strong>Paso 3:</strong> 2" + sup(m + n) + " = " + respuesta + " ✅"
                ];
            } else if (tipoLey === 2) {
                const base = 3, m = aleatorio(3, 5), n = aleatorio(1, 2);
                respuesta = Math.pow(base, m - n);
                texto = "3" + sup(m) + " ÷ 3" + sup(n) + " = ?";
                pista = "Misma base y divide: se RESTAN los exponentes";
                info = "Ley: aᵐ ÷ aⁿ = aᵐ⁻ⁿ. Aquí: 3" + sup(m) + " ÷ 3" + sup(n) + " = 3" + sup(m - n);
                pasosLista = [
                    "<strong>Paso 1:</strong> Misma base (3) y divide → se restan exponentes.",
                    "<strong>Paso 2:</strong> 3" + sup(m) + " ÷ 3" + sup(n) + " = 3" + sup(m) + "⁻" + sup(n) + " = 3" + sup(m - n),
                    "<strong>Paso 3:</strong> 3" + sup(m - n) + " = " + respuesta + " ✅"
                ];
            } else {
                const a = aleatorio(2, 4), b = aleatorio(2, 5);
                respuesta = (a * a) - (b * b);
                texto = a + "² - " + b + "² = ?";
                pista = "Diferencia de cuadrados: (a + b)(a - b) o directo";
                info = "Diferencia de cuadrados: a² - b² = (a + b)(a - b). Aquí: (" + a + " + " + b + ")(" + a + " - " + b + ")";
                pasosLista = [
                    "<strong>Paso 1:</strong> Calcula cada cuadrado: " + a + "² = " + (a * a) + ", " + b + "² = " + (b * b),
                    "<strong>Paso 2:</strong> Resta: " + (a * a) + " - " + (b * b) + " = " + respuesta,
                    "<strong>Paso 3 (truco EXANI):</strong> (" + a + " + " + b + ")(" + a + " - " + b + ") = " + (a + b) + " × " + (a - b) + " = " + respuesta + " ✅"
                ];
            }
        }

        respuestaCorrecta = respuesta;
        pasos = pasosLista;
        pasoActual = 0;

        elOperacion.textContent = texto;
        elPista.textContent = "💡 " + pista;
        elInfo.textContent = info;
        elFeedback.textContent = "";
        input.value = "";
        input.classList.remove("correcto", "incorrecto");
        zonaPasos.style.display = "none";
        listaPasos.innerHTML = "";
        pasosContador.textContent = "";
        setTimeout(function () { input.focus(); }, 50);
    }

    function mostrarPaso() {
        if (pasoActual >= pasos.length) return;
        zonaPasos.style.display = "block";
        const div = document.createElement("div");
        div.className = "paso";
        div.innerHTML = pasos[pasoActual];
        listaPasos.appendChild(div);
        pasoActual++;
        pasosContador.textContent = "Paso " + pasoActual + " de " + pasos.length;
        if (pasoActual >= pasos.length) {
            btnSiguientePaso.textContent = "Ya viste todos los pasos ✅";
        }
    }

    function mostrarTodos() {
        zonaPasos.style.display = "block";
        listaPasos.innerHTML = pasos.map(p => '<div class="paso">' + p + '</div>').join("");
        pasoActual = pasos.length;
        pasosContador.textContent = "Paso " + pasos.length + " de " + pasos.length + " - Ya viste todo";
        btnSiguientePaso.textContent = "Ya viste todos los pasos ✅";
    }

    function comprobar() {
        if (!jugando) return;
        const valor = input.value.trim();
        if (valor === "") {
            elFeedback.textContent = "⚠️ Escribe tu resultado primero.";
            elFeedback.style.color = "#ffcc70";
            return;
        }
        practicadas++;
        elPracticadas.textContent = practicadas;

        if (Number(valor) === respuestaCorrecta) {
            correctas++;
            elCorrectas.textContent = correctas;
            if (correctas % 5 === 0) { nivel++; elNivel.textContent = nivel; }
            elFeedback.textContent = "✅ ¡Correcto! " + elOperacion.textContent.replace(" = ?", " = " + respuestaCorrecta);
            elFeedback.style.color = "#4ade80";
            input.classList.add("correcto");
            elFin.style.display = "none";
            setTimeout(generar, 1200);
        } else {
            elFeedback.textContent = "❌ No es. Mira el paso a paso abajo, no pasa nada, así se aprende. La respuesta era " + respuestaCorrecta;
            elFeedback.style.color = "#f87171";
            input.classList.add("incorrecto");
            mostrarTodos();
        }
    }

    function empezar() {
        jugando = true;
        zonaInput.style.display = "block";
        btnStart.style.display = "none";
        elFin.style.display = "none";
        generar();
    }

    function cambiarCategoria(nueva, btnActivo, etiqueta) {
        categoria = nueva;
        [btnTodas, btnCuadrados, btnCubos, btnRaices, btnLeyes].forEach(b => b.classList.remove("activo"));
        btnActivo.classList.add("activo");
        elTipo.textContent = "Categoría: " + etiqueta;
        if (!jugando) {
            elOperacion.textContent = "Presiona PRACTICAR";
            elInfo.textContent = "Elige una categoría y presiona PRACTICAR. Aquí no pierdes vidas, aprendes con pasos.";
        } else {
            generar();
        }
    }

    btnStart.addEventListener("click", empezar);
    btnComprobar.addEventListener("click", comprobar);
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") comprobar(); });
    btnSiguiente.addEventListener("click", function () { if (jugando) generar(); });
    btnSiguientePaso.addEventListener("click", mostrarPaso);
    btnVerTodos.addEventListener("click", mostrarTodos);
    btnAyuda.addEventListener("click", mostrarTodos);

    btnTodas.addEventListener("click", function () { cambiarCategoria("todas", btnTodas, "Todas - Cuadrados, cubos, raíces y leyes"); });
    btnCuadrados.addEventListener("click", function () { cambiarCategoria("cuadrados", btnCuadrados, "Cuadrados"); });
    btnCubos.addEventListener("click", function () { cambiarCategoria("cubos", btnCubos, "Cubos"); });
    btnRaices.addEventListener("click", function () { cambiarCategoria("raices", btnRaices, "Raíces"); });
    btnLeyes.addEventListener("click", function () { cambiarCategoria("leyes", btnLeyes, "Leyes de exponentes"); });
});