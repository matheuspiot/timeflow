let timerInterval;
let horas = 0, minutos = 0, segundos = 0, milisegundos = 0;
let isRunning = false;

// Função para iniciar o timer
function startTimer() {
    if (!isRunning) {
        timerInterval = setInterval(timer, 10);
        isRunning = true;
        toggleButtons();
    }
}

// Função para parar o timer
function stopTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    toggleButtons();
}

// Função para zerar o timer
function resetTimer() {
    clearInterval(timerInterval);
    horas = 0;
    minutos = 0;
    segundos = 0;
    milisegundos = 0;
    document.querySelector('.timer-display').innerText = formatTime();
    clearTrackRecords();  // Função para limpar os registros de tempo
    isRunning = false;
    toggleButtons();
}

// Função para atualizar o timer
function timer() {
    if ((milisegundos += 10) === 1000) {
        milisegundos = 0;
        segundos++;
    }
    if (segundos === 60) {
        segundos = 0;
        minutos++;
    }
    if (minutos === 60) {
        minutos = 0;
        horas++;
    }
    document.querySelector('.timer-display').innerText = formatTime();
}

// Função para formatar o tempo
function formatTime() {
    return `${pad(minutos)}:${pad(segundos)},${pad(Math.floor(milisegundos / 10))}`;
}

// Função para adicionar zero à esquerda
function pad(value) {
    return value < 10 ? `0${value}` : value;
}

// Função para alternar entre os botões
function toggleButtons() {
    const startButton = document.querySelector('.button.start');
    const trackButton = document.querySelector('.button.track');
    const stopButton = document.querySelector('.button.stop');
    const resetButton = document.querySelector('.button.reset');

    if (isRunning) {
        // Quando o timer estiver rodando
        startButton.style.display = 'none';  // Esconde o botão "Iniciar"
        stopButton.style.display = 'flex';   // Mostra o botão "Parar"
        trackButton.style.display = 'flex';  // Mostra o botão "Track"
        trackButton.disabled = false;        // Ativa o botão "Track" para funcionar
        resetButton.style.display = 'none';  // Esconde o botão "Zerar"
    } else {
        // Quando o timer estiver parado
        startButton.style.display = 'flex'; // Mostra o botão "Iniciar"
        stopButton.style.display = 'none';   // Esconde o botão "Parar"

        // Troca o botão "Track" para "Zerar" se o tempo não for 00:00,00
        trackButton.style.display = 'none';  // Esconde o botão "Track"
        resetButton.style.display = document.querySelector('.timer-display').innerText === '00:00,00' ? 'none' : 'flex';
    }
}

// Função para registrar o tempo do botão Track
function trackTime() {
    if (isRunning) {
        const timeList = document.querySelector('.time-list');
        const timeItem = document.createElement('div');
        timeItem.classList.add('time-item');
        timeItem.innerHTML = `
            <div class="time-label">Track</div>
            <div class="time-value">${formatTime()}</div>
        `;
        timeList.appendChild(timeItem);
    }
}

// Função para limpar os registros de tempo
function clearTrackRecords() {
    const timeList = document.querySelector('.time-list');
    timeList.innerHTML = ''; // Remove todos os registros
}

// Add eventos aos botões
document.querySelector('.button.start').addEventListener('click', startTimer);
document.querySelector('.button.track').addEventListener('click', trackTime);
document.querySelector('.button.stop').addEventListener('click', stopTimer);
document.querySelector('.button.reset').addEventListener('click', resetTimer);

// Inicialmente, mostrar apenas Iniciar e Track (desabilitado)
document.querySelector('.button.stop').style.display = 'none';
document.querySelector('.button.reset').style.display = 'none';
document.querySelector('.button.track').disabled = true; // Track desativado até o cronômetro iniciar
