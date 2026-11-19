// Atrapa el Resultado - Globos que caen - Secundaria / Prepa / EXANI

document.addEventListener("DOMContentLoaded", function () {
    const elTiempo = document.getElementById("tiempo");
    const elPuntos = document.getElementById("puntos");
    const elVidas = document.getElementById("vidas");
    const elRacha = document.getElementById("racha");
    const elTipo = document.getElementById("tipo");
    const elPregunta = document.getElementById("pregunta");
    const area = document.getElementById("area");
    const centro = document.getElementById("centro");
    const btnJugar = document.getElementById("btn-jugar");
    const elFin = document.getElementById("fin");
    const elResultado = document.getElementById("resultado");

    const btnSec = document.getElementById("btn-secundaria");
    const btnPrepa = document.getElementById("btn-prepa");
    const btnExani = document.getElementById("btn-exani");

    let nivel = "secundaria";
    let puntos = 0, racha = 0, mejorRacha = 0, vidas = 3, segundos = 60;
    let timer = null, spawner = null, animador = null;
    let jugando = false;
    let respuestaCorrecta = 0;
    let globos = [];

    function aleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function generarPregunta() {
        let texto = "", respuesta = 0, tipo = "";

        if (nivel === "secundaria") {
            const op = aleatorio(1, 4);
            if (op === 1) { const a = aleatorio(15, 99), b = aleatorio(12, 89); texto = a + " + " + b + " = ?"; respuesta = a + b; tipo = "Suma"; }
            else if (op === 2) { const a = aleatorio(40, 99), b = aleatorio(10, a - 5); texto = a + " - " + b + " = ?"; respuesta = a - b; tipo = "Resta"; }
            else if (op === 3) { const a = aleatorio(3, 12), b = aleatorio(3, 12); texto = a + " × " + b + " = ?"; respuesta = a * b; tipo = "Multiplicación"; }
            else { const b = aleatorio(3, 9), r = aleatorio(3, 12); texto = (b * r) + " ÷ " + b + " = ?"; respuesta = r; tipo = "División"; }
        } else if (nivel === "prepa") {
            const op = aleatorio(1, 3);
            if (op === 1) { const base = [100, 120, 200, 240, 80][aleatorio(0, 4)]; const pct = [10, 20, 25, 50][aleatorio(0, 3)]; texto = pct + "% de " + base + " = ?"; respuesta = base * pct / 100; tipo = "Porcentaje"; }
            else if (op === 2) { const a = aleatorio(2, 6), b = aleatorio(2, 6), c = aleatorio(3, 9); texto = a + " + " + b + " × " + c + " = ?"; respuesta = a + b * c; tipo = "Jerarquía"; }
            else { const base = [40, 60, 80, 120][aleatorio(0, 3)]; texto = "3/4 de " + base + " = ?"; respuesta = base / 4 * 3; tipo = "Fracción"; }
        } else { // EXANI
            const op = aleatorio(1, 3);
            if (op === 1) { const base = [150, 250, 400, 90][aleatorio(0, 3)]; const pct = [20, 30, 40][aleatorio(0, 2)]; texto = pct + "% de " + base + " = ?"; respuesta = base * pct / 100; tipo = "EXANI • Porcentaje"; }
            else if (op === 2) { const a = aleatorio(12, 48); texto = a + " × 5 = ?"; respuesta = a * 5; tipo = "EXANI • Truco ×5"; }
            else { const a = aleatorio(5, 15), b = aleatorio(3, 9); texto = "(-" + a + ") + " + b + " = ?"; respuesta = -a + b; tipo = "EXANI • Signos"; }
        }

        respuestaCorrecta = respuesta;
        elPregunta.textContent = texto;
        elTipo.textContent = "Nivel: " + (nivel === "secundaria" ? "Secundaria 3ero" : nivel === "prepa" ? "Prepa" : "EXANI II") + " • " + tipo;
    }

    function crearGlobo(esCorrecto) {
        const colores = ["globo-rosa", "globo-morado", "globo-azul", "globo-verde", "globo-naranja"];
        const globo = document.createElement("div");
        globo.className = "globo " + colores[aleatorio(0, colores.length - 1)];

        let valor;
        if (esCorrecto) {
            valor = respuestaCorrecta;
        } else {
            do {
                valor = respuestaCorrecta + aleatorio(1, 12) * (Math.random() > 0.5 ? 1 : -1);
            } while (valor === respuestaCorrecta || valor < 0 || globos.some(g => g.valor === valor));
        }

        globo.textContent = valor;
        globo.style.left = aleatorio(5, area.clientWidth - 75) + "px";
        globo.dataset.correcto = esCorrecto ? "1" : "0";

        const obj = { el: globo, valor: valor, y: -90, velocidad: nivel === "secundaria" ? aleatorio(1.2, 1.8) : nivel === "prepa" ? aleatorio(1.6, 2.2) : aleatorio(2, 2.8), correcto: esCorrecto };
        globo.addEventListener("click", function () { atrapar(obj); });
        area.appendChild(globo);
        globos.push(obj);
    }

    function atrapar(obj) {
        if (!jugando) return;
        obj.el.classList.add("reventado");
        setTimeout(function () { if (obj.el.parentNode) obj.el.remove(); }, 200);
        globos = globos.filter(g => g !== obj);

        if (obj.correcto) {
            puntos += 10 + (racha >= 3 ? 5 : 0);
            racha++;
            if (racha > mejorRacha) mejorRacha = racha;
            elResultado.textContent = "✅ ¡Atrapado! +10 pts" + (racha >= 3 ? " +5 bonus 🔥" : "");
            elResultado.style.color = "#4ade80";
            generarPregunta();
        } else {
            vidas--;
            racha = 0;
            elVidas.textContent = vidas;
            elResultado.textContent = "❌ Ese no era. Era: " + respuestaCorrecta + ". Te queda " + vidas + " ❤️";
            elResultado.style.color = "#f87171";
            if (vidas <= 0) terminar("sin-vidas");
        }

        elPuntos.textContent = puntos;
        elRacha.textContent = racha;
    }

    function loopGlobos() {
        globos.forEach(function (g) {
            g.y += g.velocidad;
            g.el.style.top = g.y + "px";
        });
        // Si el globo correcto se va, pierdes la oportunidad pero no vida, solo generas nueva pregunta
        globos = globos.filter(function (g) {
            if (g.y > area.clientHeight + 20) {
                g.el.remove();
                if (g.correcto) generarPregunta();
                return false;
            }
            return true;
        });
    }

    function empezar() {
        puntos = 0; racha = 0; mejorRacha = 0; vidas = 3; segundos = 60;
        jugando = true;
        elPuntos.textContent = "0"; elRacha.textContent = "0"; elVidas.textContent = "3"; elTiempo.textContent = "60";
        elFin.style.display = "none"; elResultado.textContent = "";
        centro.style.display = "none";
        globos.forEach(g => g.el.remove()); globos = [];

        generarPregunta();

        clearInterval(timer); clearInterval(spawner); clearInterval(animador);
        timer = setInterval(function () {
            segundos--;
            elTiempo.textContent = segundos;
            if (segundos <= 10) elTiempo.style.color = "#f87171";
            else elTiempo.style.color = "";
            if (segundos <= 0) terminar("tiempo");
        }, 1000);

        // Cada 1.4s sale un globo, 1 de cada 3 es el correcto
        let contador = 0;
        spawner = setInterval(function () {
            contador++;
            crearGlobo(contador % 3 === 0);
        }, 1400);

        animador = setInterval(loopGlobos, 16);
    }

    function terminar(motivo) {
        clearInterval(timer); clearInterval(spawner); clearInterval(animador);
        jugando = false;
        globos.forEach(g => g.el.remove()); globos = [];

        elPregunta.textContent = motivo === "sin-vidas" ? "💔 ¡Te quedaste sin vidas!" : "⏰ ¡Tiempo!";
        elFin.style.display = "block";
        centro.style.display = "block";
        centro.innerHTML = '<button id="btn-jugar-2" class="btn-comprobar">JUGAR DE NUEVO ↻</button><p class="ayuda-juego">Los globos caen, atrapa solo el correcto</p>';
        document.getElementById("btn-jugar-2").addEventListener("click", empezar);

        if (puntos >= 100) elFin.textContent = "🏆 ¡INCREÍBLE! " + puntos + " puntos. Mejor racha: " + mejorRacha;
        else if (puntos >= 60) elFin.textContent = "🎉 ¡Muy bien! " + puntos + " puntos. Mejor racha: " + mejorRacha + " 🔥";
        else if (puntos >= 30) elFin.textContent = "👍 Bien: " + puntos + " puntos. Primero resuelve, luego busca el globo.";
        else elFin.textContent = "💪 Tienes " + puntos + " puntos. Lee los trucos abajo y vuelve a intentar.";
    }

    function cambiarNivel(nuevo, btnActivo) {
        if (jugando) return;
        nivel = nuevo;
        [btnSec, btnPrepa, btnExani].forEach(b => b.classList.remove("activo"));
        btnActivo.classList.add("activo");
        elTipo.textContent = "Nivel: " + (nuevo === "secundaria" ? "Secundaria 3ero - Operaciones básicas" : nuevo === "prepa" ? "Prepa - Porcentajes y jerarquía" : "EXANI II - Trucos y signos");
        elPregunta.textContent = "Presiona JUGAR";
    }

    btnJugar.addEventListener("click", empezar);
    btnSec.addEventListener("click", function () { cambiarNivel("secundaria", btnSec); });
    btnPrepa.addEventListener("click", function () { cambiarNivel("prepa", btnPrepa); });
    btnExani.addEventListener("click", function () { cambiarNivel("exani", btnExani); });
});