let cronometros = [];

function addCronometro() {
    let dataFinal = prompt("Digite a data final (AAAA-MM-DD HH:MM:SS):");
    let dataFinalObj = new Date(dataFinal);
    cronometros.push(dataFinalObj);

    atualizarTabela();
}

function atualizarTabela() {
    let tabela = document.getElementById('cronometros');
    tabela.innerHTML = '<tr><th>Meta</th><th>Tempo Restante</th></tr>';

    for (let i = 0; i < cronometros.length; i++) {
        let agora = new Date();
        let diferenca = cronometros[i] - agora;

        let segundos = Math.floor((diferenca / 1000) % 60);
        let minutos = Math.floor((diferenca / 1000 / 60) % 60);
        let horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
        let dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
        let meses = Math.floor(dias / 30);
        dias %= 30;

        tabela.innerHTML += '<tr><td>Meta ' + (i+1) + '</td><td>' + meses + ' meses, ' + dias + ' dias, ' + horas + ' horas, ' + minutos + ' minutos, ' + segundos + ' segundos</td></tr>';
    }
}

document.getElementById('addCronometro').onclick = addCronometro;

document.getElementById('changeTheme').onclick = function() {
    document.body.classList.toggle("dark-theme");
}

setInterval(atualizarTabela, 1000);
