// js\ui\formHandler.js
import { handleAddGame } from './gameUI.js';
import { handleAddTask } from './taskUI.js';

export function initializeGameForm() {
    const gameForm = document.getElementById("game-form");
    gameForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        await handleAddGame();
    });

    resetGameForm();
}

export function resetGameForm() {
    document.getElementById("gameDescription").value = '';
    document.getElementById("abbreviation").value = '';
    document.getElementById("capStamina").value = 240;
    document.getElementById("staminaPerMinute").value = 6;
}

export function initializeTaskForm() {
    const taskForm = document.getElementById("task-form");
    taskForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        await handleAddTask();
    })

    resetTaskForm();

    const hasDateSelector = document.getElementById("hasDateSelector");

    if (hasDateSelector) {
        hasDateSelector.addEventListener("change", () => handleDateSelector(hasDateSelector.checked));
    }
}

export function resetTaskForm() {
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
