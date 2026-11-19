// Fracciones y Decimales - Paso a paso - Sin vidas, acepta fracción o decimal

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
    const btnFracciones = document.getElementById("btn-fracciones");
    const btnDecimales = document.getElementById("btn-decimales");
    const btnConversion = document.getElementById("btn-conversion");
    const btnProblemas = document.getElementById("btn-problemas");

    let categoria = "todas";
    let practicadas = 0, correctas = 0, nivel = 1;
    let respuestaValor = 0;
    let respuestaTexto = "";
    let pasos = [];
    let pasoActual = 0;
    let jugando = false;

    function aleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function mcd(a, b) {
        return b === 0 ? a : mcd(b, a % b);
    }

    function simplificar(num, den) {
        const d = mcd(Math.abs(num), Math.abs(den));
        return [num / d, den / d];
    }

    function formatearFraccion(num, den) {
        const s = simplificar(num, den);
        if (s[1] === 1) return String(s[0]);
        return s[0] + "/" + s[1];
    }

    function redondear(n) {
        return Math.round(n * 1000) / 1000;
    }

    // Convierte lo que escribe el usuario: "3/4", "0.75", "0,75", "1 1/2"
    function parseRespuesta(texto) {
        let t = texto.trim().replace(",", ".").replace(/\s+/g, " ");
        if (t === "") return null;
        if (t.includes(" ") && t.includes("/")) {
            const partes = t.split(" ");
            const entero = Number(partes[0]);
            const frac = partes[1].split("/");
            if (frac.length !== 2) return null;
            return entero + Number(frac[0]) / Number(frac[1]);
        }
        if (t.includes("/")) {
            const partes = t.split("/");
            if (partes.length !== 2) return null;
            const num = Number(partes[0]);
            const den = Number(partes[1]);
            if (isNaN(num) || isNaN(den) || den === 0) return null;
            return num / den;
        }
        const n = Number(t);
        return isNaN(n) ? null : n;
    }

    function generar() {
        let texto = "", pista = "", info = "", pasosLista = [], valor = 0, textoResp = "";
        const cats = categoria === "todas" ? ["fracciones", "decimales", "conversion", "problemas"] : [categoria];
        const cat = cats[aleatorio(0, cats.length - 1)];

        if (cat === "fracciones") {
            const tipo = aleatorio(1, 3);
            if (tipo === 1) {
                const den = aleatorio(3, 10);
                const a = aleatorio(1, den - 1);
                const b = aleatorio(1, den - 1);
                valor = (a + b) / den;
                textoResp = formatearFraccion(a + b, den);
                texto = a + "/" + den + " + " + b + "/" + den + " = ?";
                pista = "Mismo denominador: se suman solo los de arriba";
                info = "Suma con mismo denominador: se copia el denominador y se suman los numeradores.";
                pasosLista = [
                    "<strong>Paso 1:</strong> ¿Denominador igual? Sí, los dos son " + den + ". Se copia.",
                    "<strong>Paso 2:</strong> Suma los de arriba: " + a + " + " + b + " = " + (a + b),
                    "<strong>Paso 3:</strong> Resultado: " + (a + b) + "/" + den + (textoResp !== (a + b) + "/" + den ? " → simplificado: " + textoResp : "") + " ✅"
                ];
            } else if (tipo === 2) {
                const den = aleatorio(4, 10);
                const a = aleatorio(3, den - 1);
                const b = aleatorio(1, a - 1);
                valor = (a - b) / den;
                textoResp = formatearFraccion(a - b, den);
                texto = a + "/" + den + " - " + b + "/" + den + " = ?";
                pista = "Mismo denominador: se restan solo los de arriba";
                info = "Resta con mismo denominador: se copia el denominador y se restan los numeradores.";
                pasosLista = [
                    "<strong>Paso 1:</strong> ¿Denominador igual? Sí, los dos son " + den + ". Se copia.",
                    "<strong>Paso 2:</strong> Resta los de arriba: " + a + " - " + b + " = " + (a - b),
                    "<strong>Paso 3:</strong> Resultado: " + (a - b) + "/" + den + (textoResp !== (a - b) + "/" + den ? " → simplificado: " + textoResp : "") + " ✅"
                ];
            } else {
                const a = aleatorio(1, 5), b = aleatorio(2, 6);
                const c = aleatorio(1, 5), d = aleatorio(2, 6);
                valor = (a * c) / (b * d);
                textoResp = formatearFraccion(a * c, b * d);
                texto = a + "/" + b + " × " + c + "/" + d + " = ?";
                pista = "Multiplicación: arriba × arriba, abajo × abajo";
                info = "Multiplicación de fracciones: numerador × numerador, denominador × denominador.";
                pasosLista = [
                    "<strong>Paso 1:</strong> Multiplica arriba: " + a + " × " + c + " = " + (a * c),
                    "<strong>Paso 2:</strong> Multiplica abajo: " + b + " × " + d + " = " + (b * d),
                    "<strong>Paso 3:</strong> Resultado: " + (a * c) + "/" + (b * d) + (textoResp !== (a * c) + "/" + (b * d) ? " → simplificado: " + textoResp : "") + " ✅"
                ];
            }
        } else if (cat === "decimales") {
            const tipo = aleatorio(1, 3);
            if (tipo === 1) {
                const a = redondear(aleatorio(10, 99) / 10);
                const b = redondear(aleatorio(10, 99) / 10);
                valor = redondear(a + b);
                textoResp = String(valor);
                texto = a + " + " + b + " = ?";
                pista = "Suma decimales: alinea el punto y suma normal";
                info = "Suma de decimales: alinea el punto decimal y suma como si fueran enteros.";
                pasosLista = [
                    "<strong>Paso 1:</strong> Alinea el punto: " + a + " + " + b,
                    "<strong>Paso 2:</strong> Suma normal: " + a + " + " + b + " = " + valor,
                    "<strong>Paso 3:</strong> Baja el punto en el mismo lugar ✅"
                ];
            } else if (tipo === 2) {
                const a = aleatorio(4, 20);
                const dec = [0.5, 0.25, 0.2, 0.1][aleatorio(0, 3)];
                valor = redondear(a * dec);
                textoResp = String(valor);
                texto = a + " × " + dec + " = ?";
                pista = "Truco: × 0.5 es ÷ 2, × 0.25 es ÷ 4, × 0.1 es ÷ 10";
                info = "Multiplicar por 0.5 es la mitad, por 0.25 es la cuarta parte, por 0.1 es la décima parte.";
                pasosLista = [
                    "<strong>Paso 1:</strong> ¿Por qué número multiplicas? " + dec,
                    "<strong>Paso 2:</strong> " + (dec === 0.5 ? a + " × 0.5 = " + a + " ÷ 2" : dec === 0.25 ? a + " × 0.25 = " + a + " ÷ 4" : dec === 0.2 ? a + " × 0.2 = " + a + " ÷ 5" : a + " × 0.1 = " + a + " ÷ 10"),
                    "<strong>Paso 3:</strong> Resultado: " + valor + " ✅"
                ];
            } else {
                const a = aleatorio(2, 9);
                const b = aleatorio(2, 9);
                const dec = redondear(a / b);
                valor = dec;
                textoResp = String(dec);
                texto = a + " ÷ " + b + " = ? (decimal)";
                pista = "Divide: a ÷ b, si sale con muchos decimales redondea a 2";
                info = "Para pasar a decimal, divide el de arriba entre el de abajo.";
                pasosLista = [
                    "<strong>Paso 1:</strong> Divide: " + a + " ÷ " + b,
                    "<strong>Paso 2:</strong> " + a + " ÷ " + b + " = " + dec,
                    "<strong>Paso 3:</strong> Resultado decimal: " + dec + " ✅"
                ];
            }
        } else if (cat === "conversion") {
            const tipo = aleatorio(1, 2);
            if (tipo === 1) {
                const fracs = [[1, 2, 0.5], [1, 4, 0.25], [3, 4, 0.75], [1, 5, 0.2], [2, 5, 0.4], [1, 10, 0.1], [3, 5, 0.6]];
                const f = fracs[aleatorio(0, fracs.length - 1)];
                valor = f[2];
                textoResp = String(f[2]) + " (o " + f[0] + "/" + f[1] + ")";
                texto = "¿Cuánto es " + f[0] + "/" + f[1] + " en decimal?";
                pista = "Fracción a decimal: divide arriba ÷ abajo";
                info = "Apréndete estas: 1/2 = 0.5, 1/4 = 0.25, 3/4 = 0.75, 1/5 = 0.2";
                pasosLista = [
                    "<strong>Paso 1:</strong> Divide arriba ÷ abajo: " + f[0] + " ÷ " + f[1],
                    "<strong>Paso 2:</strong> " + f[0] + " ÷ " + f[1] + " = " + f[2],
                    "<strong>Paso 3:</strong> " + f[0] + "/" + f[1] + " = " + f[2] + " ✅"
                ];
            } else {
                const decs = [[0.5, "1/2"], [0.25, "1/4"], [0.75, "3/4"], [0.2, "1/5"], [0.4, "2/5"], [0.1, "1/10"]];
                const d = decs[aleatorio(0, decs.length - 1)];
                valor = d[0];
                textoResp = d[1] + " (o " + d[0] + ")";
                texto = "¿Cuánto es " + d[0] + " en fracción?";
                pista = "Decimal a fracción: 0.5 = 5/10 = 1/2, simplifica";
                info = "Decimal a fracción: escribe el decimal sobre 10, 100, etc. y simplifica.";
                pasosLista = [
                    "<strong>Paso 1:</strong> " + d[0] + " tiene 1 decimal, va sobre 10: " + (d[0] * 10) + "/10",
                    "<strong>Paso 2:</strong> Simplifica dividiendo arriba y abajo entre " + (d[0] * 10 === 5 ? "5" : d[0] * 10 === 25 ? "25" : d[0] * 10 === 75 ? "25" : "2"),
                    "<strong>Paso 3:</strong> " + d[0] + " = " + d[1] + " ✅"
                ];
            }
        } else {
            const tipo = aleatorio(1, 2);
            if (tipo === 1) {
                const base = [40, 60, 80, 120, 200][aleatorio(0, 4)];
                const num = [1, 3][aleatorio(0, 1)];
                const den = 4;
                valor = base / den * num;
                textoResp = String(valor);
                texto = "¿Cuánto es " + num + "/" + den + " de " + base + "?";
                pista = "Fracción de un número: divide entre abajo, multiplica por arriba";
                info = "Fracción de un número: primero divide entre el denominador, luego multiplica por el numerador.";
                pasosLista = [
                    "<strong>Paso 1:</strong> Divide entre abajo: " + base + " ÷ " + den + " = " + (base / den),
                    "<strong>Paso 2:</strong> Multiplica por arriba: " + (base / den) + " × " + num + " = " + valor,
                    "<strong>Paso 3:</strong> " + num + "/" + den + " de " + base + " = " + valor + " ✅"
                ];
            } else {
                const precio = [80, 120, 200, 150][aleatorio(0, 3)];
                const desc = [0.5, 0.25][aleatorio(0, 1)];
                valor = redondear(precio * desc);
                textoResp = String(valor);
                texto = "Un producto de $" + precio + " tiene descuento de " + desc + ". ¿Cuánto descuentan?";
                pista = "Descuento: precio × decimal";
                info = "Descuento: multiplica el precio por el decimal. 0.5 = mitad, 0.25 = cuarta parte.";
                pasosLista = [
                    "<strong>Paso 1:</strong> Descuento = " + precio + " × " + desc,
                    "<strong>Paso 2:</strong> " + (desc === 0.5 ? precio + " × 0.5 = " + precio + " ÷ 2" : precio + " × 0.25 = " + precio + " ÷ 4"),
                    "<strong>Paso 3:</strong> Descuentan $" + valor + " ✅"
                ];
            }
        }

        respuestaValor = valor;
        respuestaTexto = textoResp;
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
        const valorUsuario = parseRespuesta(input.value);
        if (valorUsuario === null) {
            elFeedback.textContent = "⚠️ Escribe tu respuesta como 3/4 o 0.75";
            elFeedback.style.color = "#ffcc70";
            return;
        }
        practicadas++;
        elPracticadas.textContent = practicadas;

        if (Math.abs(valorUsuario - respuestaValor) < 0.001) {
            correctas++;
            elCorrectas.textContent = correctas;
            if (correctas % 5 === 0) { nivel++; elNivel.textContent = nivel; }
            elFeedback.textContent = "✅ ¡Correcto! = " + respuestaTexto;
            elFeedback.style.color = "#4ade80";
            input.classList.add("correcto");
            setTimeout(generar, 1200);
        } else {
            elFeedback.textContent = "❌ No es. Mira el paso a paso abajo. La respuesta era " + respuestaTexto;
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
        [btnTodas, btnFracciones, btnDecimales, btnConversion, btnProblemas].forEach(b => b.classList.remove("activo"));
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

    btnTodas.addEventListener("click", function () { cambiarCategoria("todas", btnTodas, "Todas - Fracciones, decimales y conversión"); });
    btnFracciones.addEventListener("click", function () { cambiarCategoria("fracciones", btnFracciones, "Fracciones"); });
    btnDecimales.addEventListener("click", function () { cambiarCategoria("decimales", btnDecimales, "Decimales"); });
    btnConversion.addEventListener("click", function () { cambiarCategoria("conversion", btnConversion, "Conversión"); });
    btnProblemas.addEventListener("click", function () { cambiarCategoria("problemas", btnProblemas, "Problemas EXANI"); });
});