import { fetchAllTasks, completeTask, fetchTaskById } from '../database/taskDB.js';
import { formatDateForDisplay, formatDateForInput } from '../utils/dateUtils.js';
import RefreshTypeEnum from '../enums/RefreshTypeEnum.js';

export async function displayAllTasks() {
    const tasks = await fetchAllTasks();
    const gameScheduleBody = document.getElementById("gameScheduleBody");
    gameScheduleBody.innerHTML = ''; // clear data

    tasks.forEach(task => {
        const row = createTaskRow(task);
        gameScheduleBody.appendChild(row);
        addTaskEventListeners(task);
    });
}

function createTaskRow(task) {
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
        <td>${formatDateForDisplay(task.expirationDate)}</td>
        <td>
            <button class="spacing-left" id="edit-task-${task.id}">Edit</button>
        </td>
    `;

    return row;
}

export function addTaskEventListeners(task) {
    const checkbox = document.getElementById(`task-checkbox-${task.id}`);
    const editButton = document.getElementById(`edit-task-${task.id}`);

    if (checkbox) {
        checkbox.addEventListener("change", () => handleTaskCompletion(task.id, checkbox.checked))
    }
 
    if (editButton) {
        editButton.addEventListener("click", () => handleEditTask(task.id))
    }
}

async function handleTaskCompletion(id, value) {
    await completeTask(id, value);
    await displayAllTasks();
}    

async function handleEditTask (id) {
    const task = await fetchTaskById(id);

    if (task) {
        document.getElementById("gameId").value = task.gameId;

        document.getElementById("taskDescription").value = task.description;
        document.getElementById("expirationDay").value = 0;
        document.getElementById("expirationHour").value = 0;

        document.getElementById("expirationDate").value = formatDateForInput(task.expirationDate);
        document.getElementById("refreshType").value = task.refreshType;
    }
}    
