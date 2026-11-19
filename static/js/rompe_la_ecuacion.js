// Rompe la Ecuación - Despeja x - Secundaria / Prepa / EXANI

document.addEventListener("DOMContentLoaded", function () {
    const elNivel = document.getElementById("nivel");
    const elVidas = document.getElementById("vidas");
    const elPuntos = document.getElementById("puntos");
    const elTiempo = document.getElementById("tiempo");
    const elTipo = document.getElementById("tipo");
    const elEcuacion = document.getElementById("ecuacion");
    const elPista = document.getElementById("pista");
    const zonaInput = document.getElementById("zona-input");
    const input = document.getElementById("respuesta");
    const btnComprobar = document.getElementById("btn-comprobar-respuesta");
    const btnStart = document.getElementById("btn-start");
    const elFeedback = document.getElementById("feedback");
    const elFin = document.getElementById("fin");
    const elResultado = document.getElementById("resultado");

    const btnSec = document.getElementById("btn-secundaria");
    const btnPrepa = document.getElementById("btn-prepa");
    const btnExani = document.getElementById("btn-exani");

    let modo = "secundaria";
    let nivel = 1, vidas = 3, puntos = 0, segundos = 90;
    let timer = null, jugando = false;
    let xCorrecta = 0, pasoSolucion = "";

    function aleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function generarEcuacion() {
        let texto = "", pista = "";
        input.value = "";
        input.classList.remove("correcto", "incorrecto");

        if (modo === "secundaria") {
            const op = aleatorio(1, 4);
            const x = aleatorio(2, 12);
            if (op === 1) { const b = aleatorio(2, 15); texto = "x + " + b + " = " + (x + b); pista = "Lo que suma pasa restando"; pasoSolucion = "x = " + (x + b) + " - " + b + " = " + x; }
            else if (op === 2) { const b = aleatorio(2, 8); texto = "x - " + b + " = " + (x - b); pista = "Lo que resta pasa sumando"; pasoSolucion = "x = " + (x - b) + " + " + b + " = " + x; }
            else if (op === 3) { const a = aleatorio(2, 9); texto = a + "x = " + (a * x); pista = "Lo que multiplica pasa dividiendo"; pasoSolucion = "x = " + (a * x) + " ÷ " + a + " = " + x; }
            else { const a = aleatorio(2, 6); texto = "x ÷ " + a + " = " + x; pista = "Lo que divide pasa multiplicando"; pasoSolucion = "x = " + x + " × " + a + " = " + (x * a); xCorrecta = x * a; return finalizarGeneracion(texto, pista); }
            xCorrecta = x;
        } else if (modo === "prepa") {
            const op = aleatorio(1, 3);
            if (op === 1) { // 2 pasos: ax + b = c
                const a = aleatorio(2, 6), b = aleatorio(2, 10), x = aleatorio(2, 10);
                const c = a * x + b;
                texto = a + "x + " + b + " = " + c;
                pista = "Primero pasa lo que suma, luego lo que multiplica";
                pasoSolucion = a + "x = " + c + " - " + b + " = " + (a * x) + " → x = " + (a * x) + " ÷ " + a + " = " + x;
                xCorrecta = x;
            } else if (op === 2) { // ax - b = c
                const a = aleatorio(2, 6), b = aleatorio(2, 9), x = aleatorio(3, 10);
                const c = a * x - b;
                texto = a + "x - " + b + " = " + c;
                pista = "Primero pasa lo que resta, luego lo que multiplica";
                pasoSolucion = a + "x = " + c + " + " + b + " = " + (a * x) + " → x = " + (a * x) + " ÷ " + a + " = " + x;
                xCorrecta = x;
            } else { // x en los dos lados
                const a = aleatorio(3, 6), b = aleatorio(1, a - 1), x = aleatorio(3, 9), c = aleatorio(2, 12);
                const d = (a - b) * x + c;
                texto = a + "x + " + c + " = " + b + "x + " + d;
                pista = "Junta las x de un lado y los números del otro";
                pasoSolucion = (a - b) + "x = " + d + " - " + c + " = " + ((a - b) * x) + " → x = " + x;
                xCorrecta = x;
            }
        } else { // EXANI
            const op = aleatorio(1, 3);
            if (op === 1) { // 2 pasos con números más grandes
                const a = aleatorio(3, 8), b = aleatorio(5, 15), x = aleatorio(3, 12);
                const c = a * x + b;
                texto = a + "x + " + b + " = " + c;
                pista = "EXANI: 2 pasos, no te apures";
                pasoSolucion = a + "x = " + c + " - " + b + " = " + (a * x) + " → x = " + x;
                xCorrecta = x;
            } else if (op === 2) { // problema: doble + ...
                const a = aleatorio(2, 4), b = aleatorio(3, 9), x = aleatorio(4, 12);
                const c = a * x + b;
                texto = "El doble de un número + " + b + " = " + c + " ¿x?";
                if (a === 3) texto = "El triple de un número + " + b + " = " + c + " ¿x?";
                pista = "Traduce: doble = 2x, triple = 3x";
                pasoSolucion = a + "x = " + c + " - " + b + " = " + (a * x) + " → x = " + x;
                xCorrecta = x;
            } else { // x en dos lados EXANI
                const a = aleatorio(4, 7), b = aleatorio(1, 3), x = aleatorio(4, 10), c = aleatorio(3, 10);
                const d = (a - b) * x + c;
                texto = a + "x + " + c + " = " + b + "x + " + d;
                pista = "Junta x de un lado, números del otro";
                pasoSolucion = (a - b) + "x = " + d + " - " + c + " = " + ((a - b) * x) + " → x = " + x;
                xCorrecta = x;
            }
        }

        finalizarGeneracion(texto, pista);
    }

    function finalizarGeneracion(texto, pista) {
        elEcuacion.textContent = texto;
        elPista.textContent = "💡 Pista: " + pista;
        elFeedback.textContent = "";
        setTimeout(function () { input.focus(); }, 50);
    }

    function comprobar() {
        if (!jugando) return;
        const valor = input.value.trim();
        if (valor === "") {
            elFeedback.textContent = "⚠️ Escribe tu x primero.";
            elFeedback.style.color = "#ffcc70";
            return;
        }

        const num = Number(valor);
        if (num === xCorrecta) {
            puntos += 10 + (nivel - 1) * 2;
            elPuntos.textContent = puntos;
            elFeedback.textContent = "💥 ¡ROMPIDO! " + pasoSolucion;
            elFeedback.style.color = "#4ade80";
            input.classList.add("correcto");
            nivel++;
            elNivel.textContent = nivel;
            setTimeout(generarEcuacion, 1300);
        } else {
            vidas--;
            elVidas.textContent = vidas;
            elFeedback.textContent = "❌ Nope. " + pasoSolucion;
            elFeedback.style.color = "#f87171";
            input.classList.add("incorrecto");
            if (vidas <= 0) terminar("sin-vidas");
            else setTimeout(generarEcuacion, 1800);
        }
    }

    function empezar() {
        nivel = 1; vidas = 3; puntos = 0; segundos = 90;
        jugando = true;
        elNivel.textContent = "1"; elVidas.textContent = "3"; elPuntos.textContent = "0"; elTiempo.textContent = "90";
        elFin.style.display = "none"; elResultado.textContent = "";
        zonaInput.style.display = "block";
        btnStart.style.display = "none";

        clearInterval(timer);
        timer = setInterval(function () {
            segundos--;
            elTiempo.textContent = segundos;
            if (segundos <= 10) elTiempo.style.color = "#f87171";
            else elTiempo.style.color = "";
            if (segundos <= 0) terminar("tiempo");
        }, 1000);

        generarEcuacion();
    }

    function terminar(motivo) {
        clearInterval(timer);
        jugando = false;
        zonaInput.style.display = "none";
        btnStart.style.display = "inline-block";
        btnStart.textContent = "JUGAR DE NUEVO ↻";
        elEcuacion.textContent = motivo === "sin-vidas" ? "💔 ¡Sin vidas!" : "⏰ ¡Tiempo!";
        elPista.textContent = "";
        elFin.style.display = "block";

        if (puntos >= 100) elFin.textContent = "🏆 ¡MAESTRO! " + puntos + " puntos. Llegaste a nivel " + nivel;
        else if (puntos >= 60) elFin.textContent = "🎉 ¡Muy bien! " + puntos + " puntos. Nivel " + nivel + " desbloqueado.";
        else if (puntos >= 30) elFin.textContent = "👍 Bien: " + puntos + " puntos. Nivel " + nivel + ". Recuerda: primero lo que suma, luego lo que multiplica.";
        else elFin.textContent = "💪 Tienes " + puntos + " puntos. Lee los trucos arriba y vuelve a intentar.";
    }

    function cambiarModo(nuevo, btnActivo) {
        if (jugando) return;
        modo = nuevo;
        [btnSec, btnPrepa, btnExani].forEach(b => b.classList.remove("activo"));
        btnActivo.classList.add("activo");
        elTipo.textContent = "Modo: " + (nuevo === "secundaria" ? "Secundaria 3ero - Ecuaciones de 1 paso" : nuevo === "prepa" ? "Prepa - Ecuaciones de 2 pasos" : "EXANI - Ecuaciones y problemas");
        elEcuacion.textContent = "Presiona INICIAR";
        elPista.textContent = "";
    }

    btnStart.addEventListener("click", empezar);
    btnComprobar.addEventListener("click", comprobar);
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") comprobar(); });
    btnSec.addEventListener("click", function () { cambiarModo("secundaria", btnSec); });
    btnPrepa.addEventListener("click", function () { cambiarModo("prepa", btnPrepa); });
    btnExani.addEventListener("click", function () { cambiarModo("exani", btnExani); });
});