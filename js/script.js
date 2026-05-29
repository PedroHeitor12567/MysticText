const inputEl = document.getElementById("input");
const outputBox = document.querySelector(".output-box");
const copyBtn = document.getElementById("copy-btn");
const clearBtn = document.getElementById("clear-btn");
const toolBtns = document.querySelectorAll(".tool-btn");
const statsContainer = document.querySelector(".stats");

let currentText = "";
let activeTransform = null;

function countWords(text) { /* Contar palavras */
    const trimmed = text.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
}

function countChars(text) { /* Contar caracteres */
    return text.length;
}

function countSentences(text) { /* Contar frases */
    const trimmed = text.trim();
    if (!trimmed) return 0;
    const matches = trimmed.match(/[^.!?]*[.!?]+/g);
    return matches ? matches.length : 1;
}

function renderStats(text) { /* Renderizar estatísticas */
    statsContainer.innerHTML = `
        <div class="stat"><strong>${countWords(text)}</strong> palavras</div>
        <div class="stat"><strong>${countChars(text)}</strong> caracteres</div>
        <div class="stat"><strong>${countSentences(text)}</strong> frases</div>
    `;
}

function renderOutput(text) { /* Renderizar output */
    if (!text) {
        outputBox.innerHTML = "<p>Tudo brilha aqui ✨</p>";
    } else {
        outputBox.textContent = text;
    }
}

function applyTransform(name, text) { /* Aplicar transformações */
    switch (name) {
        case "MAIÚSCULAS":
            return text.toUpperCase();
        case "minúsculas":
            return text.toLowerCase();
        case "Formato título":
            return text.replace(/\S+/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
        case "AlTeRnAdO":
            return text.split("").map((ch, i) => i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()).join("");
        case "Inverter texto":
            return text.split("").reverse().join("");
        case "Remover espaços":
            return text.replace(/\s+/g, " ").trim();
        case "Glitter":
            return text.split("").join("✨");
        case "Bolha":
            return text.split("").map(ch => {
                const code = ch.codePointAt(0);
                if (code >= 65 && code <= 90) return String.fromCodePoint(9398 + code - 65);
                if (code >= 97 && code <= 122) return String.fromCodePoint(9424 + code - 97);
                if (code >= 48 && code <= 57) return ["⓪","①","②","③","④","⑤","⑥","⑦","⑧","⑨"][code - 48];
                return ch;
            }).join("");
        default:
            return text;
    }
}

console.log(toolBtns)

toolBtns.forEach(botao => {
    botao.addEventListener("click", () => {
        toolBtns.forEach(b => b.classList.remove("ativo"));
        botao.classList.add("ativo");
        activeTransform = botao.textContent.trim();
        renderOutput(applyTransform(activeTransform, currentText));
    })
});

async function copyText() {
    const text = outputBox.textContent.trim();
    if (!text || text === "Tudo brilha aqui ✨") return;

    await navigator.clipboard.writeText(text);
    alert("Texto copiado!")
}


inputEl.addEventListener("input", () => {
    currentText = inputEl.value;
    renderStats(currentText);
    renderOutput(activeTransform ? applyTransform(activeTransform, currentText) : currentText);
});

/* Limpar */
function clear() {
    currentText = "";
    inputEl.value = ""
    renderOutput(currentText)
    renderStats(currentText)
}

function toggleMusic() {
    const audio = document.getElementById("red-audio");
    const btn = document.getElementById("show-btn");

    if (audio.paused) {
        audio.play();
        btn.textContent = "⏸ Pausar o show";
        btn.classList.add("playing");
    } else {
        audio.pause();
        btn.textContent = "🎤 A hora do show";
        btn.classList.remove("playing");
    }
}

clearBtn.addEventListener("click", clear)