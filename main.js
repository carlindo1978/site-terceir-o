var isDarkTheme = false;

function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.body.style.backgroundColor = isDarkTheme ? '#333' : '#FFF';
    document.body.style.color = isDarkTheme ? '#FFF' : '#000';
    var inputs = document.querySelectorAll('input');
    var buttons = document.querySelectorAll('button');
    var goals = document.querySelectorAll('div');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].style.backgroundColor = isDarkTheme ? '#555' : '#FFF';
        inputs[i].style.color = isDarkTheme ? '#FFF' : '#000';
    }
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].style.backgroundColor = isDarkTheme ? '#007BFF' : '#FFF';
        buttons[i].style.color = isDarkTheme ? '#FFF' : '#000';
    }
    for (var i = 0; i < goals.length; i++) {
        goals[i].style.backgroundColor = isDarkTheme ? '#333' : '#FFF';
        goals[i].style.color = isDarkTheme ? '#FFF' : '#000';
    }
}

function createGoal() {
    var goalName = document.getElementById('goalName').value;
    var goalDate = document.getElementById('goalDate').value;

    if (goalName && goalDate) {
        var goalElement = document.createElement('div');
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.onclick = function() {
            goalElement.remove();
        };

        var targetDate = new Date(goalDate);
        goalElement.textContent = 'Meta: ' + goalName + ', Tempo restante: ';
        goalElement.appendChild(deleteButton);

        var timeRemainingElement = document.createElement('span');
        timeRemainingElement.dataset.targetDate = targetDate.getTime();
        goalElement.insertBefore(timeRemainingElement, deleteButton);

        // Define as cores de fundo e de texto das novas metas com base no tema atual
        goalElement.style.backgroundColor = isDarkTheme ? '#333' : '#FFF';
        goalElement.style.color = isDarkTheme ? '#FFF' : '#000';

        document.getElementById('goalsContainer').appendChild(goalElement);
        updateRemainingTime(timeRemainingElement);
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}


function updateRemainingTime(element) {
    var targetDate = new Date(Number(element.dataset.targetDate));
    var currentDate = new Date();
    var timeDiff = Math.abs(targetDate.getTime() - currentDate.getTime());

    var diffDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    timeDiff -= diffDays * (1000 * 60 * 60 * 24);

    var diffHours = Math.floor(timeDiff / (1000 * 60 * 60));
    timeDiff -= diffHours * (1000 * 60 * 60);

    var diffMinutes = Math.floor(timeDiff / (1000 * 60));
    timeDiff -= diffMinutes * (1000 * 60);

    var diffSeconds = Math.floor(timeDiff / 1000);

    element.textContent = diffDays + ' dias, ' + 
                         diffHours.toString().padStart(2, '0') + ' horas, ' + 
                         diffMinutes.toString().padStart(2, '0') + ' minutos, ' + 
                         diffSeconds.toString().padStart(2, '0') + ' segundos ';
}


setInterval(function() {
    var timeRemainingElements = document.querySelectorAll('span');
    for (var i = 0; i < timeRemainingElements.length; i++) {
        updateRemainingTime(timeRemainingElements[i]);
    }
}, 1000);
