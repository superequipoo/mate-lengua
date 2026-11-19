// Cálculo Veloz - 60 segundos - Secundaria / Prepa / EXANI

document.addEventListener("DOMContentLoaded", function () {
    const elTiempo = document.getElementById("tiempo");
    const elPuntos = document.getElementById("puntos");
    const elRacha = document.getElementById("racha");
    const elTipo = document.getElementById("tipo");
    const elPregunta = document.getElementById("pregunta");
    const zonaOpciones = document.getElementById("opciones");
    const btnJugar = document.getElementById("btn-jugar");
    const elFinal = document.getElementById("final");
    const elResultado = document.getElementById("resultado");

    const btnSec = document.getElementById("btn-secundaria");
    const btnPrepa = document.getElementById("btn-prepa");
    const btnExani = document.getElementById("btn-exani");

    let nivel = "secundaria";
    let puntos = 0;
    let racha = 0;
    let mejorRacha = 0;
    let segundos = 60;
    let timer = null;
    let jugando = false;
    let respuestaCorrecta = 0;
    let totalPreguntas = 0;

    function aleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function mezclar(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    // ===== GENERAR PREGUNTA SEGÚN NIVEL =====
    function generarPregunta() {
        let texto = "";
        let respuesta = 0;
        let tipo = "";

        if (nivel === "secundaria") {
            const op = aleatorio(1, 4);
            if (op === 1) { // suma
                const a = aleatorio(15, 99), b = aleatorio(12, 89);
                texto = a + " + " + b + " = ?";
                respuesta = a + b; tipo = "Suma";
            } else if (op === 2) { // resta
                const a = aleatorio(40, 99), b = aleatorio(10, a - 5);
                texto = a + " - " + b + " = ?";
                respuesta = a - b; tipo = "Resta";
            } else if (op === 3) { // multiplicación
                const a = aleatorio(3, 12), b = aleatorio(3, 12);
                texto = a + " × " + b + " = ?";
                respuesta = a * b; tipo = "Multiplicación";
            } else { // división exacta
                const b = aleatorio(3, 9), r = aleatorio(3, 12);
                texto = (b * r) + " ÷ " + b + " = ?";
                respuesta = r; tipo = "División";
            }
        } else if (nivel === "prepa") {
            const op = aleatorio(1, 4);
            if (op === 1) { // porcentaje
                const base = [100, 120, 150, 200, 240, 300, 80, 60][aleatorio(0, 7)];
                const pct = [10, 20, 25, 50][aleatorio(0, 3)];
                texto = "¿Cuánto es el " + pct + "% de " + base + "?";
                respuesta = base * pct / 100; tipo = "Porcentaje";
            } else if (op === 2) { // jerarquía
                const a = aleatorio(2, 6), b = aleatorio(2, 6), c = aleatorio(3, 9);
                texto = a + " + " + b + " × " + c + " = ?";
                respuesta = a + b * c; tipo = "Jerarquía";
            } else if (op === 3) { // fracción de un número
                const base = [40, 60, 80, 120][aleatorio(0, 3)];
                const num = [1, 3][aleatorio(0, 1)];
                texto = "¿Cuánto es " + num + "/4 de " + base + "?";
                respuesta = base / 4 * num; tipo = "Fracción";
            } else { // número faltante
                const a = aleatorio(3, 9), r = aleatorio(4, 12);
                texto = a + " × ___ = " + (a * r);
                respuesta = r; tipo = "Número faltante";
            }
        } else { // EXANI
            const op = aleatorio(1, 4);
            if (op === 1) { // porcentaje difícil
                const base = [150, 250, 400, 600, 90][aleatorio(0, 4)];
                const pct = [20, 30, 40, 10][aleatorio(0, 3)];
                texto = "El " + pct + "% de " + base + " es:";
                respuesta = base * pct / 100; tipo = "EXANI • Porcentaje";
            } else if (op === 2) { // operación con signos
                const a = aleatorio(5, 15), b = aleatorio(3, 9);
                texto = "(-" + a + ") + " + b + " = ?";
                respuesta = -a + b; tipo = "EXANI • Signos";
            } else if (op === 3) { // multiplicación por 5 / 25
                const a = aleatorio(12, 48);
                texto = a + " × 5 = ?";
                respuesta = a * 5; tipo = "EXANI • Truco ×5";
            } else { // doble operación
                const a = aleatorio(12, 40), b = aleatorio(4, 12);
                texto = a + " + " + b + " × 2 = ?";
                respuesta = a + b * 2; tipo = "EXANI • Jerarquía";
            }
        }

        respuestaCorrecta = respuesta;
        elPregunta.textContent = texto;
        elTipo.textContent = "Nivel: " + (nivel === "secundaria" ? "Secundaria 3ero" : nivel === "prepa" ? "Prepa" : "EXANI II") + " • " + tipo;

        // 4 opciones: correcta + 3 distractores
        const opciones = new Set([respuesta]);
        while (opciones.size < 4) {
            const delta = aleatorio(1, 10) * (Math.random() > 0.5 ? 1 : -1);
            const falsa = respuesta + delta;
            if (falsa >= 0) opciones.add(falsa);
        }
        const lista = mezclar([...opciones]);

        zonaOpciones.innerHTML = "";
        lista.forEach(function (valor) {
            const btn = document.createElement("button");
            btn.className = "btn-opcion";
            btn.type = "button";
            btn.textContent = valor;
            btn.addEventListener("click", function () { responder(valor, btn); });
            zonaOpciones.appendChild(btn);
        });
    }

    function responder(valor, btn) {
        if (!jugando) return;
        totalPreguntas++;

        if (valor === respuestaCorrecta) {
            puntos += 10 + (racha >= 3 ? 5 : 0);
            racha++;
            if (racha > mejorRacha) mejorRacha = racha;
            elResultado.textContent = "✅ ¡Bien! +10 pts" + (racha >= 3 ? " +5 bonus racha 🔥" : "");
            elResultado.style.color = "#4ade80";
            btn.classList.add("correcta");
        } else {
            racha = 0;
            elResultado.textContent = "❌ Era: " + respuestaCorrecta + ". No te detengas, sigue.";
            elResultado.style.color = "#f87171";
            btn.classList.add("incorrecta");
        }

        elPuntos.textContent = puntos;
        elRacha.textContent = racha;

        setTimeout(generarPregunta, 300);
    }

    function empezar() {
        puntos = 0; racha = 0; mejorRacha = 0; totalPreguntas = 0; segundos = 60;
        jugando = true;
        elPuntos.textContent = "0";
        elRacha.textContent = "0";
        elTiempo.textContent = "60";
        elFinal.style.display = "none";
        elResultado.textContent = "";
        if (btnJugar) btnJugar.style.display = "none";

        clearInterval(timer);
        timer = setInterval(function () {
            segundos--;
            elTiempo.textContent = segundos;
            if (segundos <= 10) elTiempo.style.color = "#f87171";
            else elTiempo.style.color = "";
            if (segundos <= 0) terminar();
        }, 1000);

        generarPregunta();
    }

    function terminar() {
        clearInterval(timer);
        jugando = false;
        elTiempo.textContent = "0";
        zonaOpciones.innerHTML = "";
        const btn = document.createElement("button");
        btn.className = "btn-comprobar";
        btn.type = "button";
        btn.textContent = "JUGAR DE NUEVO ↻";
        btn.addEventListener("click", empezar);
        zonaOpciones.appendChild(btn);

        elPregunta.textContent = "⏰ ¡Tiempo!";
        elFinal.style.display = "block";
        if (puntos >= 100) elFinal.textContent = "🏆 ¡INCREÍBLE! " + puntos + " puntos en 60s. Eres calculadora humana.";
        else if (puntos >= 60) elFinal.textContent = "🎉 ¡Muy bien! " + puntos + " puntos. Mejor racha: " + mejorRacha + " 🔥";
        else if (puntos >= 30) elFinal.textContent = "👍 Bien: " + puntos + " puntos. Practica los trucos de ×5 y % y subes rápido.";
        else elFinal.textContent = "💪 Tienes " + puntos + " puntos. Lee los trucos abajo y vuelve a intentar.";
    }

    function cambiarNivel(nuevo, btnActivo) {
        if (jugando) return;
        nivel = nuevo;
        [btnSec, btnPrepa, btnExani].forEach(function (b) { b.classList.remove("activo"); });
        btnActivo.classList.add("activo");
        elTipo.textContent = "Nivel: " + (nuevo === "secundaria" ? "Secundaria 3ero" : nuevo === "prepa" ? "Prepa" : "EXANI II");
        elPregunta.textContent = "Presiona JUGAR";
        zonaOpciones.innerHTML = "";
        const b = document.createElement("button");
        b.className = "btn-comprobar";
        b.type = "button";
        b.textContent = "JUGAR ▶";
        b.addEventListener("click", empezar);
        zonaOpciones.appendChild(b);
    }

    // ===== EVENTOS =====
    if (btnJugar) btnJugar.addEventListener("click", empezar);
    btnSec.addEventListener("click", function () { cambiarNivel("secundaria", btnSec); });
    btnPrepa.addEventListener("click", function () { cambiarNivel("prepa", btnPrepa); });
    btnExani.addEventListener("click", function () { cambiarNivel("exani", btnExani); });
});