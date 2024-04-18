function adicionarObjetivo() {
    var objetivo = document.createElement('div');
    objetivo.className = 'objetivo';
    objetivo.innerHTML = `
        <input type="text" placeholder="Nome do Objetivo">
        <input type="datetime-local">
        <button onclick="iniciarCronometro(this);">Iniciar</button>
        <button onclick="removerObjetivo(this);">Remover</button>
        <span></span>
    `;
    document.getElementById('objetivos').appendChild(objetivo);
}

function iniciarCronometro(button) {
    var objetivo = button.parentElement;
    var dataConclusao = new Date(objetivo.querySelector('input[type="datetime-local"]').value);
    var span = objetivo.querySelector('span');
    var interval = setInterval(function() {
        var agora = new Date();
        var tempoRestante = Math.floor((dataConclusao - agora) / 1000);
        if (tempoRestante > 0) {
            span.textContent = ' Tempo restante: ' + tempoRestante + ' segundos';
        } else {
            clearInterval(interval);
            span.textContent = ' Objetivo concluído!';
        }
    }, 1000);
}

function removerObjetivo(button) {
    var objetivo = button.parentElement;
    document.getElementById('objetivos').removeChild(objetivo);
}
