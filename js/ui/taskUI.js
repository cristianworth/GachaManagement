// js\ui\taskUI.js
import { Task } from '../data/Task.js';
import { fetchAllTasks, completeTask, fetchTaskById, addTask, updateTask, deleteTaskById } from '../database/taskDB.js';
import { formatDateForDisplay, formatDateForInput, getExpirationDate } from '../utils/dateUtils.js';
import { clearFieldsFromTaskForm } from './formHandler.js'
import { setDateSelector } from './formHandler.js';
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
        editButton.addEventListener("click", () => handleEditTask(task.id))

    if (deleteButton) 
        deleteButton.addEventListener("click", () => handleDelete(task.id))
}

async function handleTaskCompletion(taskId, value) {
    await completeTask(taskId, value);
    await displayAllTasks();
}    

async function handleEditTask (taskId) {
    const task = await fetchTaskById(taskId);

    if (task) {
        document.getElementById("submitTaskForm").textContent = "Update Task";
        document.getElementById("taskId").value = task.id;
        document.getElementById("gameId").value = task.gameId;

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
}

