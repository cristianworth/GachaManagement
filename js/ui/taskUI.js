// js\ui\taskUI.js
import { Task } from '../data/Task.js';
import { fetchAllTasks, completeTask, fetchTaskById, addTask, updateTask, deleteTaskById } from '../database/taskDB.js';
import { formatDateForDisplay, formatDateForInput, getExpirationDate } from '../utils/dateUtils.js';
import { resetTaskForm, setDateSelector, setTaskFormMessage } from './formHandler.js'
import RefreshTypeEnum from '../enums/RefreshTypeEnum.js';
import Router from '../utils/router.js';

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
        <td>${RefreshTypeEnum.findNameById(task.refreshType)}</td>
        <td>${formatDateForDisplay(task.expirationDate)}</td>
        <td>
            <button class="spacing-left" id="edit-task-${task.id}">Edit</button>
            <button class="spacing-left" id="delete-task-${task.id}">Delete</button>
        </td>
    `;

    return row;
}

function addTaskEventListeners(task) {
    const checkbox = document.getElementById(`task-checkbox-${task.id}`);
    const editButton = document.getElementById(`edit-task-${task.id}`);
    const deleteButton = document.getElementById(`delete-task-${task.id}`);

    if (checkbox) 
        checkbox.addEventListener("change", () => handleTaskCompletion(task.id, checkbox.checked))
 
    if (editButton)
        editButton.addEventListener("click", () => handleTaskEdit(task.id))

    if (deleteButton) 
        deleteButton.addEventListener("click", () => handleDelete(task.id))
}

async function handleTaskCompletion(taskId, value) {
    await completeTask(taskId, value);
    await displayAllTasks();
}    

async function handleTaskEdit (taskId) {
    Router.navigateTo('/tasks/create');

    const task = await fetchTaskById(taskId);
    if (task) {
        document.getElementById("taskId").value = task.id;
        document.getElementById("taskGameId").value = task.gameId;
        setTaskFormMessage();

        document.getElementById("taskDescription").value = task.description;
        document.getElementById("expirationDay").value = 0;
        document.getElementById("expirationHour").value = 0;

        setDateSelector(true);
        document.getElementById("expirationDate").value = formatDateForInput(task.expirationDate);
        document.getElementById("refreshType").value = task.refreshType;
    }
}    

async function handleDelete(taskId) {
    await deleteTaskById(taskId);
    await displayAllTasks();
}

export async function handleAddTask() {
    const selectGame = document.getElementById("taskGameId");
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

    const taskId = document.getElementById("taskId").value ? parseInt(document.getElementById("taskId").value) : undefined;

    const task = new Task(
        taskDescription,
        expirationDate,
        refreshType,
        gameId,
        gameDescription,
        taskId,
    );
    
    debugger;
    if (taskId) {
        await updateTask(task);
    } else {
        await addTask(task);
    }

    displayAllTasks();
    resetTaskForm();
}

