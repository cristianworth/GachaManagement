import { Game } from '../data/Game.js';
import { Task } from '../data/Task.js';
import { getRandomColor } from '../utils/colorUtils.js';
import { addGame } from '../database/gameDB.js';
import { addTask, updateTask } from '../database/taskDB.js';
import { displayAllGames } from './gameUI.js';
import { displayAllTasks } from './taskUI.js';
import { getExpirationDate } from '../utils/dateUtils.js';

export function initializeGameForm() {
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
        clearFieldsFromGameForm();
    });

    clearFieldsFromGameForm();
}

function clearFieldsFromGameForm() {
    document.getElementById("gameDescription").value = '';
    document.getElementById("abbreviation").value = '';
    document.getElementById("capStamina").value = 240;
    document.getElementById("staminaPerMinute").value = 6;
}

export function initializeTaskForm() {
    const taskForm = document.getElementById("task-form");
    taskForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        
        const selectGame = document.getElementById("gameId");
        const gameId = parseInt(selectGame.value);
        const gameDescription = selectGame.options[selectGame.selectedIndex].text;
        const taskDescription = document.getElementById("taskDescription").value;
        const refreshType = parseInt(document.getElementById("refreshType").value);

        const hasDateSelector = document.getElementById("hasDateSelector").checked;
        let expirationDate = new Date();
        if (hasDateSelector) {
            expirationDate = new Date(document.getElementById("expirationDate").value);
        } else {
            const expirationDay = parseInt(document.getElementById("expirationDay").value) | 0;
            const expirationHour = parseInt(document.getElementById("expirationHour").value) | 0;    
            expirationDate = getExpirationDate(expirationDay, expirationHour);
        }

        const taskId = parseInt(document.getElementById("taskId").value);
        if (taskId) {
            const updatedTask = new Task(
                taskDescription,
                expirationDate,
                refreshType,
                gameId,
                gameDescription,
                taskId,
            );
            
            await updateTask(updatedTask);
        } else {
            const newTask = new Task(
                taskDescription,
                expirationDate,
                refreshType,
                gameId,
                gameDescription,
            );
            
            await addTask(newTask);
        }

        displayAllTasks();
        clearFieldsFromTaskForm();
    })

    clearFieldsFromTaskForm();

    const hasDateSelector = document.getElementById("hasDateSelector");

    if (hasDateSelector) {
        hasDateSelector.addEventListener("change", () => handleDateSelector(hasDateSelector.checked));
    }
}

function clearFieldsFromTaskForm() {
    document.getElementById("submitTaskForm").textContent = "Add Task";
    document.getElementById("taskId").value = '';
    document.getElementById("taskDescription").value = '';
    document.getElementById("expirationDay").value = 0;
    document.getElementById("expirationHour").value = 0;
    document.getElementById("expirationDate").value = '';
    setDateSelector(false);
}

export function setDateSelector(hasDateSelector) {
    document.getElementById("hasDateSelector").checked = hasDateSelector;
    handleDateSelector(hasDateSelector);
}

function handleDateSelector(hasDateSelector) {
    if (hasDateSelector) {
        document.getElementById("divExpirationDate").hidden = false;
        document.getElementById("divExpirationDayAndHour").hidden = true;
    } else {
        document.getElementById("divExpirationDate").hidden = true;
        document.getElementById("divExpirationDayAndHour").hidden = false;
    }
}
