// Porcentajes y Descuentos - Paso a paso - Sin vidas, aprendes con pasos

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
    const elResultado = document.getElementById("resultado");
    const btnSiguiente = document.getElementById("btn-siguiente");

    const btnTodas = document.getElementById("btn-todas");
    const btnBasico = document.getElementById("btn-basico");
    const btnTactico = document.getElementById("btn-tactico");
    const btnDescuento = document.getElementById("btn-descuento");
    const btnInverso = document.getElementById("btn-inverso");

    let categoria = "todas";
    let practicadas = 0, correctas = 0, nivel = 1;
    let respuestaCorrecta = 0;
    let pasos = [];
    let pasoActual = 0;
    let jugando = false;

    function aleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function redondear(n) {
        return Math.round(n * 100) / 100;
    }

    // ===== GENERAR EJERCICIO =====
    function generar() {
        let texto = "", pista = "", info = "", pasosLista = [], respuesta = 0;
        const cats = categoria === "todas" ? ["basico", "tactico", "descuento", "inverso"] : [categoria];
        const cat = cats[aleatorio(0, cats.length - 1)];

        if (cat === "basico") {
            // % fáciles: 10, 20, 25, 50
            const base = [100, 120, 150, 200, 240, 300, 80, 60, 400, 90][aleatorio(0, 9)];
            const pct = [10, 20, 25, 50][aleatorio(0, 3)];
            respuesta = redondear(base * pct / 100);
            texto = "¿Cuánto es el " + pct + "% de " + base + "?";
            pista = pct === 10 ? "10%: quita un cero" : pct === 50 ? "50%: divide entre 2" : pct === 25 ? "25%: divide entre 4" : "20%: divide entre 5";
            info = "Básico: " + pct + "% de " + base + ". Usa el truco, no multipliques a lo loco.";
            const division = pct === 10 ? base + " ÷ 10" : pct === 50 ? base + " ÷ 2" : pct === 25 ? base + " ÷ 4" : base + " ÷ 5";
            pasosLista = [
                "<strong>Paso 1:</strong> ¿Qué % es? " + pct + "%. Truco: " + pista,
                "<strong>Paso 2:</strong> " + division + " = " + respuesta,
                "<strong>Paso 3:</strong> El " + pct + "% de " + base + " = " + respuesta + " ✅"
            ];
        } else if (cat === "tactico") {
            const tipo = aleatorio(1, 3);
            if (tipo === 1) { // 30% = 10% x 3
                const base = [100, 200, 150, 300, 250][aleatorio(0, 4)];
                respuesta = redondear(base * 0.30);
                texto = "¿Cuánto es el 30% de " + base + "?";
                pista = "30% = 10% × 3. Primero saca el 10%";
                info = "Táctico: 30% no se divide directo, se saca el 10% y se multiplica por 3.";
                pasosLista = [
                    "<strong>Paso 1:</strong> Saca el 10%: " + base + " ÷ 10 = " + (base / 10),
                    "<strong>Paso 2:</strong> 30% es 3 veces el 10%: " + (base / 10) + " × 3 = " + respuesta,
                    "<strong>Paso 3:</strong> El 30% de " + base + " = " + respuesta + " ✅"
                ];
            } else if (tipo === 2) { // 75% = 50% + 25%
                const base = [100, 200, 400, 80, 120][aleatorio(0, 4)];
                respuesta = redondear(base * 0.75);
                texto = "¿Cuánto es el 75% de " + base + "?";
                pista = "75% = 50% + 25%. Suma la mitad + la cuarta parte";
                info = "Táctico: 75% = 50% + 25%. Es más fácil que multiplicar por 0.75.";
                pasosLista = [
                    "<strong>Paso 1:</strong> 50% de " + base + " = " + (base / 2) + " (÷ 2)",
                    "<strong>Paso 2:</strong> 25% de " + base + " = " + (base / 4) + " (÷ 4)",
                    "<strong>Paso 3:</strong> Suma: " + (base / 2) + " + " + (base / 4) + " = " + respuesta + " ✅"
                ];
            } else { // qué % es
                const base = [120, 200, 80, 150][aleatorio(0, 3)];
                const parte = base === 120 ? 30 : base === 200 ? 50 : base === 80 ? 20 : 75;
                const pct = Math.round(parte / base * 100);
                respuesta = pct;
                texto = "¿Qué % es " + parte + " de " + base + "?";
                pista = "¿Qué % es? Divide parte ÷ total × 100";
                info = "Para saber qué % es, divide la parte entre el total y multiplica por 100.";
                pasosLista = [
                    "<strong>Paso 1:</strong> Divide parte ÷ total: " + parte + " ÷ " + base + " = " + (parte / base),
                    "<strong>Paso 2:</strong> Multiplica por 100: " + (parte / base) + " × 100 = " + pct,
                    "<strong>Paso 3:</strong> " + parte + " es el " + pct + "% de " + base + " ✅"
                ];
            }
        } else if (cat === "descuento") {
            const tipo = aleatorio(1, 2);
            const precio = [200, 350, 400, 500, 300, 250][aleatorio(0, 5)];
            const pct = [10, 20, 25, 30, 50][aleatorio(0, 4)];
            if (tipo === 1) { // cuánto descuentan
                respuesta = redondear(precio * pct / 100);
                texto = "Un producto de $" + precio + " tiene " + pct + "% de descuento. ¿Cuánto descuentan?";
                pista = "Descuento = Precio × %";
                info = "Descuento: multiplica el precio por el porcentaje.";
                pasosLista = [
                    "<strong>Paso 1:</strong> Descuento = $" + precio + " × " + pct + "%",
                    "<strong>Paso 2:</strong> $" + precio + " × " + (pct / 100) + " = $" + respuesta,
                    "<strong>Paso 3:</strong> Descuentan $" + respuesta + " ✅"
                ];
            } else { // precio final
                const descuento = redondear(precio * pct / 100);
                respuesta = redondear(precio - descuento);
                const pagaPct = 100 - pct;
                texto = "Un producto de $" + precio + " tiene " + pct + "% de descuento. ¿Cuánto pagas al final?";
                pista = "Truco: si descuentan " + pct + "%, pagas el " + pagaPct + "%";
                info = "Precio final: puedes restar el descuento, o pagar directo el " + pagaPct + "%.";
                pasosLista = [
                    "<strong>Paso 1:</strong> Si descuentan " + pct + "%, pagas el " + pagaPct + "%",
                    "<strong>Paso 2:</strong> $" + precio + " × " + pagaPct + "% = $" + precio + " × " + (pagaPct / 100) + " = $" + respuesta,
                    "<strong>Paso 3:</strong> Pagas $" + respuesta + " ✅ (Comprueba: $" + precio + " - $" + descuento + " = $" + respuesta + ")"
                ];
            }
        } else { // inverso
            const tipo = aleatorio(1, 2);
            if (tipo === 1) {
                const pct = [20, 25, 10, 50][aleatorio(0, 3)];
                const total = [200, 120, 300, 80, 400][aleatorio(0, 4)];
                const resultado = redondear(total * pct / 100);
                respuesta = total;
                texto = "El " + pct + "% de ¿qué número? es " + resultado;
                pista = "Inverso: si te dan el resultado, DIVIDE. No multipliques";
                info = "Inverso: te dan el resultado y te piden el total. Se divide.";
                const divisor = pct / 100;
                pasosLista = [
                    "<strong>Paso 1:</strong> Te dan el resultado (" + resultado + "), te piden el total. Se DIVIDE.",
                    "<strong>Paso 2:</strong> " + resultado + " ÷ " + divisor + " = " + total,
                    "<strong>Paso 3:</strong> El " + pct + "% de " + total + " = " + resultado + " ✅"
                ];
            } else {
                const total = [200, 150, 100][aleatorio(0, 2)];
                const pct = 30;
                const resultado = redondear(total * pct / 100);
                respuesta = total;
                texto = "El 30% de un número es " + resultado + ". ¿Cuál es el número?";
                pista = "30% de ¿qué? = " + resultado + ". Divide " + resultado + " ÷ 0.30";
                info = "Inverso: 30% de un número es " + resultado + ". Divide para encontrar el número.";
                pasosLista = [
                    "<strong>Paso 1:</strong> Si el 30% es " + resultado + ", el 10% es " + resultado + " ÷ 3 = " + redondear(resultado / 3),
                    "<strong>Paso 2:</strong> El 100% es 10 veces el 10%: " + redondear(resultado / 3) + " × 10 = " + total,
                    "<strong>Paso 3:</strong> El número es " + total + " ✅"
                ];
            }
        }

        respuestaCorrecta = respuesta;
        pasos = pasosLista;

        elOperacion.textContent = texto;
        elPista.textContent = "💡 " + pista;
        elInfo.textContent = info;
        elFeedback.textContent = "";
        elResultado.textContent = "";
        input.value = "";
        input.classList.remove("correcto", "incorrecto");
        zonaPasos.style.display = "none";
        listaPasos.innerHTML = "";
        pasoActual = 0;
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
        if (pasoActual >= pasos.length) btnSiguientePaso.textContent = "Ya viste todos los pasos ✅";
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
            elFeedback.textContent = "⚠️ Escribe tu número primero, sin $ ni %.";
            elFeedback.style.color = "#ffcc70";
            return;
        }
        practicadas++;
        elPracticadas.textContent = practicadas;

        if (Math.abs(Number(valor) - respuestaCorrecta) < 0.01) {
            correctas++;
            elCorrectas.textContent = correctas;
            if (correctas % 5 === 0) { nivel++; elNivel.textContent = nivel; }
            elFeedback.textContent = "✅ ¡Correcto! = " + respuestaCorrecta;
            elFeedback.style.color = "#4ade80";
            input.classList.add("correcto");
            setTimeout(generar, 1200);
        } else {
            elFeedback.textContent = "❌ No es. Mira el paso a paso abajo. La respuesta era " + respuestaCorrecta;
            elFeedback.style.color = "#f87171";
            input.classList.add("incorrecto");
            mostrarTodos();
        }
    }

    function empezar() {
        jugando = true;
        zonaInput.style.display = "block";
        btnStart.style.display = "none";
        generar();
    }

    function cambiarCategoria(nueva, btnActivo, etiqueta) {
        categoria = nueva;
        [btnTodas, btnBasico, btnTactico, btnDescuento, btnInverso].forEach(b => b.classList.remove("activo"));
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

    btnTodas.addEventListener("click", function () { cambiarCategoria("todas", btnTodas, "Todas - Básico, táctico, descuentos e inverso"); });
    btnBasico.addEventListener("click", function () { cambiarCategoria("basico", btnBasico, "Básico %"); });
    btnTactico.addEventListener("click", function () { cambiarCategoria("tactico", btnTactico, "Táctico EXANI"); });
    btnDescuento.addEventListener("click", function () { cambiarCategoria("descuento", btnDescuento, "Descuentos"); });
    btnInverso.addEventListener("click", function () { cambiarCategoria("inverso", btnInverso, "Inverso"); });
});