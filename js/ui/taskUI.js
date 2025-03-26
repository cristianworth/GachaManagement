import { fetchAllTasks, completeTask } from '../database/taskDB.js';
import { formatDate } from '../utils/dateUtils.js';
import RefreshTypeEnum from '../enums/RefreshTypeEnum.js';

export async function displayAllTasks() {
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

export function addTaskEventListeners(task) {
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
