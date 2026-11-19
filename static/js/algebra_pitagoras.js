// Álgebra y Pitágoras - Paso a paso - Sin vidas, aprendes con pasos

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
    const btnLineal = document.getElementById("btn-lineal");
    const btnCuadratica = document.getElementById("btn-cuadratica");
    const btnPitagoras = document.getElementById("btn-pitagoras");
    const btnSistema = document.getElementById("btn-sistema");

    let categoria = "todas";
    let practicadas = 0, correctas = 0, nivel = 1;
    let respuestaCorrecta = 0;
    let pasos = [];
    let pasoActual = 0;
    let jugando = false;

    function aleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function generar() {
        let texto = "", pista = "", info = "", pasosLista = [], respuesta = 0;
        const cats = categoria === "todas" ? ["lineal", "cuadratica", "pitagoras", "sistema"] : [categoria];
        const cat = cats[aleatorio(0, cats.length - 1)];

        if (cat === "lineal") {
            const tipo = aleatorio(1, 2);
            if (tipo === 1) { // ax + b = c
                const a = aleatorio(2, 6), b = aleatorio(2, 12), x = aleatorio(2, 10);
                const c = a * x + b;
                respuesta = x;
                texto = a + "x + " + b + " = " + c + "  →  x = ?";
                pista = "Primero pasa lo que suma, luego lo que multiplica";
                info = "Ecuación lineal: primero pasa lo que suma/resta, luego lo que multiplica.";
                pasosLista = [
                    "<strong>Paso 1:</strong> Pasa el " + b + " al otro lado restando: " + a + "x = " + c + " - " + b + " = " + (a * x),
                    "<strong>Paso 2:</strong> Pasa el " + a + " dividiendo: x = " + (a * x) + " ÷ " + a,
                    "<strong>Paso 3:</strong> x = " + x + " ✅ Comprueba: " + a + " × " + x + " + " + b + " = " + c
                ];
            } else { // x en los dos lados
                const a = aleatorio(3, 6), b = aleatorio(1, a - 1), x = aleatorio(3, 9), c = aleatorio(2, 10);
                const d = (a - b) * x + c;
                respuesta = x;
                texto = a + "x + " + c + " = " + b + "x + " + d + "  →  x = ?";
                pista = "Junta las x de un lado y los números del otro";
                info = "X en los dos lados: junta las x de un lado, los números del otro.";
                pasosLista = [
                    "<strong>Paso 1:</strong> Pasa las x a la izquierda: " + a + "x - " + b + "x = " + d + " - " + c,
                    "<strong>Paso 2:</strong> " + (a - b) + "x = " + ((a - b) * x),
                    "<strong>Paso 3:</strong> x = " + ((a - b) * x) + " ÷ " + (a - b) + " = " + x + " ✅"
                ];
            }
        } else if (cat === "cuadratica") {
            const tipo = aleatorio(1, 2);
            if (tipo === 1) { // x² = N
                const x = aleatorio(3, 12);
                respuesta = x;
                texto = "x² = " + (x * x) + "  →  x = ?";
                pista = "Si x² = N, entonces x = √N";
                info = "Ecuación x²: saca raíz cuadrada a los dos lados.";
                pasosLista = [
                    "<strong>Paso 1:</strong> x² = " + (x * x),
                    "<strong>Paso 2:</strong> x = √" + (x * x),
                    "<strong>Paso 3:</strong> x = " + x + " ✅ porque " + x + " × " + x + " = " + (x * x)
                ];
            } else { // x² + b = c
                const x = aleatorio(3, 10), b = aleatorio(3, 15);
                const c = x * x + b;
                respuesta = x;
                texto = "x² + " + b + " = " + c + "  →  x = ?";
                pista = "Primero pasa el número, luego saca raíz";
                info = "Ecuación x² + b: primero despeja x², luego raíz.";
                pasosLista = [
                    "<strong>Paso 1:</strong> Pasa el " + b + " restando: x² = " + c + " - " + b + " = " + (x * x),
                    "<strong>Paso 2:</strong> x = √" + (x * x),
                    "<strong>Paso 3:</strong> x = " + x + " ✅"
                ];
            }
        } else if (cat === "pitagoras") {
            const tipo = aleatorio(1, 2);
            if (tipo === 1) { // buscar hipotenusa
                const ternas = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15]];
                const t = ternas[aleatorio(0, ternas.length - 1)];
                respuesta = t[2];
                texto = "Catetos: " + t[0] + " y " + t[1] + " → ¿Hipotenusa?";
                pista = "Pitágoras: c² = a² + b², luego raíz";
                info = "Buscar hipotenusa: suma los cuadrados de los catetos y saca raíz.";
                pasosLista = [
                    "<strong>Paso 1:</strong> c² = " + t[0] + "² + " + t[1] + "² = " + (t[0] * t[0]) + " + " + (t[1] * t[1]) + " = " + (t[2] * t[2]),
                    "<strong>Paso 2:</strong> c = √" + (t[2] * t[2]),
                    "<strong>Paso 3:</strong> c = " + t[2] + " ✅ Triángulo " + t[0] + "-" + t[1] + "-" + t[2]
                ];
            } else { // buscar cateto
                const ternas = [[3, 4, 5], [6, 8, 10], [5, 12, 13]];
                const t = ternas[aleatorio(0, ternas.length - 1)];
                respuesta = t[0];
                texto = "Hipotenusa: " + t[2] + ", cateto: " + t[1] + " → ¿Otro cateto?";
                pista = "Buscar cateto: a² = c² - b²";
                info = "Buscar cateto: resta el cuadrado del cateto que sí tienes.";
                pasosLista = [
                    "<strong>Paso 1:</strong> a² = " + t[2] + "² - " + t[1] + "² = " + (t[2] * t[2]) + " - " + (t[1] * t[1]) + " = " + (t[0] * t[0]),
                    "<strong>Paso 2:</strong> a = √" + (t[0] * t[0]),
                    "<strong>Paso 3:</strong> a = " + t[0] + " ✅"
                ];
            }
        } else { // sistema mental
            const x = aleatorio(3, 9), y = aleatorio(2, 7);
            const suma = x + y, resta = x - y;
            respuesta = x;
            texto = "x + y = " + suma + "  y  x - y = " + resta + "  →  x = ?";
            pista = "Sistema: suma las dos ecuaciones, se cancela la y";
            info = "Sistema mental: suma las dos ecuaciones y la y se cancela.";
            pasosLista = [
                "<strong>Paso 1:</strong> Suma las dos: (x + y) + (x - y) = " + suma + " + " + resta,
                "<strong>Paso 2:</strong> 2x = " + (suma + resta) + " → x = " + (suma + resta) + " ÷ 2 = " + x,
                "<strong>Paso 3:</strong> x = " + x + " ✅ y = " + suma + " - " + x + " = " + y
            ];
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
            elFeedback.textContent = "⚠️ Escribe tu número primero.";
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
        [btnTodas, btnLineal, btnCuadratica, btnPitagoras, btnSistema].forEach(b => b.classList.remove("activo"));
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

    btnTodas.addEventListener("click", function () { cambiarCategoria("todas", btnTodas, "Todas - Lineal, cuadrática, Pitágoras y sistema"); });
    btnLineal.addEventListener("click", function () { cambiarCategoria("lineal", btnLineal, "Ecuación Lineal"); });
    btnCuadratica.addEventListener("click", function () { cambiarCategoria("cuadratica", btnCuadratica, "Ecuación x²"); });
    btnPitagoras.addEventListener("click", function () { cambiarCategoria("pitagoras", btnPitagoras, "Pitágoras"); });
    btnSistema.addEventListener("click", function () { cambiarCategoria("sistema", btnSistema, "Sistema mental"); });
});