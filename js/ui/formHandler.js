import { Game } from '../data/Game.js';
import { Task } from '../data/Task.js';
import { getRandomColor } from '../utils/colorUtils.js';
import { addGame } from '../database/gameDB.js';
import { addTask } from '../database/taskDB.js';
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
    });
}

export function initializeTaskForm() {
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
