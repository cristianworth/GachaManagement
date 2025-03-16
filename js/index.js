async function updateGameStamina(gameId) {
    let game = await fetchGameById(gameId);

    const staminaValue = parseInt(document.getElementById(`newStamina${gameId}`).value, 10);
    const pendingTasksValue = document.getElementById(`pendingTasks${gameId}`).value;

    if (!isNaN(staminaValue)) {
        game.currentStamina = staminaValue;
        game.pendingTasks = pendingTasksValue;
        game.dateMaxStamina = calculateMaxStaminaDate(game);
        game.maxStaminaAt = formatDateToDayHour(game.dateMaxStamina);

        document.getElementById(`newMaxStaminaAt${gameId}`).textContent = game.maxStaminaAt;

        await updateGame(game);
        displayAllGames();
    } else {
        alert("Please enter a valid integer number for stamina.");
    }
}

function calculateMaxStaminaDate(game) {
    let totalStaminaLeft = game.capStamina - game.currentStamina;
    let howManyMinutesUntilCapped = totalStaminaLeft * game.staminaPerMinute;

    let forecastDate = new Date();
    forecastDate.setMinutes(forecastDate.getMinutes() + howManyMinutesUntilCapped);

    return forecastDate;
}

function initAddGameForm() {
    let gameForm = document.getElementById("game-form");
    gameForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        
        let gameDescription = document.getElementById("gameDescription").value;
        let abbreviation = document.getElementById("abbreviation").value;
        let capStamina = document.getElementById("capStamina").value;
        let staminaPerMinute = document.getElementById("staminaPerMinute").value;

        let newGame = new Game(
            gameDescription, 
            abbreviation, 
            'img/default-icon.png',
            capStamina,
            staminaPerMinute
        );

        await addGame(newGame);
        displayAllGames();
    });
}

function initAddTaskForm() {
    let taskForm = document.getElementById("task-form");
    taskForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        
        let selectGame = document.getElementById("gameId");
        let gameId = selectGame.value;
        let gameDescription = selectGame.options[selectGame.selectedIndex].text;

        let taskDescription = document.getElementById("taskDescription").value;
        let expirationDate = getExpirationDate();
        let refreshType = parseInt(document.getElementById("refreshType").value);

        let newTask = new Task(
            taskDescription,
            expirationDate,
            refreshType,
            gameId,
            gameDescription,
        );

        await addTask(newTask);
        displayAllTasks();
    })
}

function getExpirationDate() {
    let expirationDay = parseInt(document.getElementById("expirationDay").value) | 0;
    let expirationHour = parseInt(document.getElementById("expirationHour").value) | 0;

    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + expirationDay);
    currentDate.setHours(currentDate.getHours() + expirationHour);

    return currentDate;
}

async function displayAllGames() {
    var games = await fetchAllGames();
    let gameListBody = document.getElementById("gameListBody");
    gameListBody.innerHTML = ''; // clear data

    games.forEach(game => {
        let row = `
            <tr>
                <td id="gameId${game.id}" hidden>${game.id}</td>
                <td><img src=${game.img} alt="${game.description} Icon" class="icon"></td>
                <td>${game.description}</td>
                <td>
                    <textarea id="pendingTasks${game.id}" name="pendingTasks" spellcheck="false">${game.pendingTasks || ''}</textarea>
                </td>
                <td>
                    <input class="input-centered spacing-left" id="newStamina${game.id}" name="newStamina" type="number" oninput="validateNumberInput(this)" value="${game.currentStamina | ''}" />
                    <button class="spacing-left" id="${game.id}" onclick="updateGameStamina(${game.id})">Update</button>
                </td>
                <td><span id="newMaxStaminaAt${game.id}" class="spacing-left red-text">${game.maxStaminaAt}<\span></td>
                <td hidden>${game.dateMaxStamina}</td>
            </tr>
        `;

        gameListBody.innerHTML += row;
    });
}

async function displayAllTasks() {
    var tasks = await fetchAllTasks();
    let gameScheduleBody = document.getElementById("gameScheduleBody");
    gameScheduleBody.innerHTML = ''; // clear data

    tasks.forEach(task => {
        let row = `
            <tr>
                <td id="taskId${task.id}" hidden>${task.id}</td>
                <td><input type="checkbox" id="task1" value="${task.isDone}" ${task.isDone ? "checked" : ""} onclick="updateStatus(${task.id}, this.checked)"></td>
                <td>${task.gameDescription}</td>
                <td>${task.description}</td>
                <td>${RefreshTypeEnum.BuscaNomePorId(task.refreshType)}</td>
                <td>${formatDate(task.expirationDate)}</td>
                <td><button class="spacing-left" id="${task.id}" onclick="updateTaskData(${task.id})">Edit</button></td>
            </tr>
        `;

        gameScheduleBody.innerHTML += row;
    });
}

async function updateStatus(id, value) {
    await completeTask(id, value);
    await displayAllTasks();
}

function validateNumberInput(input) {
    input.value = input.value.replace(/[^0-9]/g, '');  // Removes non-numeric characters (.,)
}

async function populateGameDropDown() {
    let games = await fetchAllGames();
    const selectGame = document.getElementById("gameId");

    games.forEach(game => {
        let option = document.createElement("option");
        option.value = game.id;
        option.textContent = game.description;
        selectGame.appendChild(option);
    });
}

function populateRefreshTypeDropDown() {
    const selectRefreshType = document.getElementById("refreshType");

    RefreshTypeEnum.values.forEach(rType => {
        let option = document.createElement("option");
        option.value = rType.id;
        option.textContent = rType.value;
        selectRefreshType.appendChild(option);
    })
}

function iniciaEventos() {
    initAddGameForm();
    initAddTaskForm();
}

function carregaDadosDoBanco() {
    displayAllGames();
    displayAllTasks();
}

function populaElementosDaTela() {
    populateGameDropDown();
    populateRefreshTypeDropDown();
}

document.addEventListener("DOMContentLoaded", function () {
    iniciaEventos();
    carregaDadosDoBanco();
    populaElementosDaTela();
});