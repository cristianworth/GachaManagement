// index.js file
import getRandomColor from './utils/colorUtils.js';
import { formatDate, formatDateToDayHour, calculateMaxStaminaDate, getExpirationDate } from './utils/dateUtils.js';
import { addGame, updateGame, fetchAllGames, fetchGameById, Game } from './Game.js'
import { addTask, fetchAllTasks, completeTask, Task } from './Task.js'
import RefreshTypeEnum from './enums/RefreshTypeEnum.js'
import { validateNumberInput } from './utils/validationUtils.js'

document.addEventListener("DOMContentLoaded", function () {
    initializeEventListeners();
    loadDatabaseData();
    populateUIElements();
});

function initializeEventListeners() {
    initializeGameForm();
    initializeTaskForm();
    initializeNumberInputValidation();
}

function loadDatabaseData() {
    displayAllGames();
    displayAllTasks();
}

function populateUIElements() {
    populateGameDropDown();
    populateRefreshTypeDropDown();
}

function initializeGameForm() {
    const gameForm = document.getElementById("game-form");
    gameForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        
        const gameDescription = document.getElementById("gameDescription").value;
        const abbreviation = document.getElementById("abbreviation").value;
        const capStamina = document.getElementById("capStamina").value;
        const staminaPerMinute = document.getElementById("staminaPerMinute").value;

        const newGame = new Game(
            gameDescription, 
            abbreviation, 
            'img/default-icon.png',
            capStamina,
            staminaPerMinute,
            getRandomColor()
        );

        await addGame(newGame);
        displayAllGames();
    });
}

async function displayAllGames() {
    const games = await fetchAllGames();
    const gameListBody = document.getElementById("gameListBody");
    gameListBody.innerHTML = ''; // clear data

    games.forEach(game => {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <img src=${game.img} alt="${game.description} Icon" class="icon">
            </td>
            <td>${game.description}</td>
            <td>
                <textarea id="pendingTask${game.id}" spellcheck="false">${game.pendingTasks || ''}</textarea>
            </td>
            <td>
                <input class="input-centered spacing-left" id="currentStamina${game.id}" type="number" value="${game.currentStamina | ''}" />
                <button class="spacing-left" id="edit-game-${game.id}">Edit</button>
            </td>
            <td>
                <span id="newMaxStaminaAt${game.id}" class="spacing-left red-text">${game.maxStaminaAt}<\span>
            </td>
        `;

        gameListBody.appendChild(row);
        addGameEventListeners(game);
    });
}

function addGameEventListeners(game) {
    const editGame = document.getElementById(`edit-game-${game.id}`);

    if (editGame) {
        editGame.addEventListener("click", () => handleGameEdit(game.id));
    }
}

async function handleGameEdit(gameId) {
    let game = await fetchGameById(gameId);

    const currentStamina = parseInt(document.getElementById(`currentStamina${game.id}`).value, 10);
    const pendingTask = document.getElementById(`pendingTask${gameId}`).value;

    if (!isNaN(currentStamina)) {
        game.currentStamina = currentStamina;
        game.pendingTasks = pendingTask;
        game.dateMaxStamina = calculateMaxStaminaDate(game);
        game.maxStaminaAt = formatDateToDayHour(game.dateMaxStamina);
        
        await updateGame(game);
        await displayAllGames();
    } else {
        alert("Please enter a valid number for stamina.");
    }
}

function initializeTaskForm() {
    const taskForm = document.getElementById("task-form");
    taskForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        
        const selectGame = document.getElementById("gameId");
        const gameId = parseInt(selectGame.value);
        const gameDescription = selectGame.options[selectGame.selectedIndex].text;

        const taskDescription = document.getElementById("taskDescription").value;
        const expirationDay = parseInt(document.getElementById("expirationDay").value) | 0;
        const expirationHour = parseInt(document.getElementById("expirationHour").value) | 0;    
        const expirationDate = getExpirationDate(expirationDay, expirationHour);
        const refreshType = parseInt(document.getElementById("refreshType").value);

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

async function displayAllTasks() {
    const tasks = await fetchAllTasks();
    const gameScheduleBody = document.getElementById("gameScheduleBody");
    gameScheduleBody.innerHTML = ''; // clear data

    tasks.forEach(task => {
        let row = document.createElement("tr");
        if (task.game && task.game.color) {
            row.style.backgroundColor = task.game.color;
        }

        row.innerHTML = `
            <td>
                <input type="checkbox" id="task-checkbox-${task.id}" ${task.isDone ? "checked" : ""}>
            </td>
            <td>${task.gameDescription}</td>
            <td>${task.description}</td>
            <td>${RefreshTypeEnum.BuscaNomePorId(task.refreshType)}</td>
            <td>${formatDate(task.expirationDate)}</td>
            <td>
                <button class="spacing-left" id="edit-task-${task.id}">Edit</button>
            </td>
        `;

        gameScheduleBody.appendChild(row);
        addTaskEventListeners(task);
    });
}

function addTaskEventListeners(task) {
    const checkbox = document.getElementById(`task-checkbox-${task.id}`);
    const editButton = document.getElementById(`edit-task-${task.id}`);

    async function updateStatus(id, value) {
        await completeTask(id, value);
        await displayAllTasks();
    }    

    if (checkbox) {
        checkbox.addEventListener("change", () => updateStatus(task.id, checkbox.checked))
    }
    
    async function prepareToUpdateTask () {
        alert('not implemented yet')
    }    

    if (editButton) {
        editButton.addEventListener("click", () => prepareToUpdateTask(task.id))
    }
}

function initializeNumberInputValidation() {
    var inputValidateNumberInput = function(event) {
        validateNumberInput(event.target);
    };

    document.getElementById('expirationDay').addEventListener('input', inputValidateNumberInput);
    document.getElementById('expirationHour').addEventListener('input', inputValidateNumberInput);
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
