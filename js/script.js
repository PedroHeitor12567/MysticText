const outputBox = document.querySelector(".output-box");
const statsContainer = document.querySelector(".stats");

function countWords(text) {
    const trimmed = text.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
}

function countChars(text) {
    return text.length;
}

function countSentences(text) {
    const trimmed = text.trim();
    if (!trimmed) return 0;
    const matches = trimmed.match(/[^.!?]*[.!?]+/g);
    return matches ? matches.length : 1;
}

function renderStats(text) {
    statsContainer.innerHTML = `
        <div class="stat">🔤 <strong>${countWords(text)}</strong> palavras</div>
        <div class="stat">💬 <strong>${countChars(text)}</strong> caracteres</div>
        <div class="stat">📝 <strong>${countSentences(text)}</strong> frases</div>
    `;
}

function renderOutput(text) {
    if (!text) {
        outputBox.innerHTML = "<p>Tudo brilha aqui ✨</p>";
    } else {
        outputBox.textContent = text;
    }
}

