
import db from './dbInit.js'
import { allTasks } from '../data/Task.js'
import { fetchGameById } from './gameDB.js'

export async function addTask(task) {
    try {
        await db.tasks.add(task);
        console.log("New Task added:", task);
    } catch (error) {
        console.error("Failed to add task:", error);
    }
}

export async function updateTask(task) {
    if (!task.id) {
        console.log("Invalid task object id: ", task);
        return;
    }

    try {
        await db.tasks.update(task.id, task);
    } catch (error) {
        console.error("Erro ao atualizar a tarefa:", error);
    }
}

export async function deleteTaskById(taskId) {
    // Not really used at the moment but can be used to update an existing Game, 
    //      delet it and then when the pages reload the populateInitialData will create it again
    // Examples:
    // deleteTaskById(1);
    // deleteTaskById(2);
    try {
        const taskFound = await fetchTaskById(taskId);

        if (taskFound) {
            await db.tasks.delete(taskId);
        } else {
            console.log(`Task with ID ${taskId} not found in the database.`);
        }
    } catch (error) {
        console.error(`Failed to delete task with ID ${taskId}:`, error);
    }
}

export async function fetchAllTasks() {
    try {
        const tasks = await db.tasks.orderBy("expirationDate").toArray();

        for (const task of tasks) {
            if (task.gameId) {
                task.game = await fetchGameById(task.gameId);
            }
        }

        console.log("Todas as tarefas:", tasks);
        return tasks;
    } catch (error) {
        console.error("Erro ao buscar todas as tarefas:", error);
        return [];
    }
}

export async function fetchTaskById(id) {
    // Method to verify if the task exists
    try {
        const task = await db.tasks.get(id);
        return task;
    } catch (error) {
        console.error("Erro ao buscar a tarefa pelo ID:", error);
        return null;
    }
}

export async function fetchTasksByGame(gameId) {
    try {
        var task = await db.tasks.where("gameId").equals(gameId).toArray();
        return task;
    } catch (error) {
        console.error("Failed to add game:", error);
    }
}

export async function completeTask(taskId, isDone) {
    try {
        var task = await db.tasks.update(taskId, { isDone: isDone });
        return task;
    } catch (error) {
        console.error("Failed to update game:", error);
    }
}

export async function populateInitialTasks() {
    try {
        const hasTasks = await hasAnyTask();

        if (!hasTasks) {
            console.log("No tasks found. Populating initial data...");
            for (const task of allTasks) {
                await addTask(task);
            }
        }
    } catch (error) {
        console.error("Error populating initial tasks data:", error);
    }
}

export async function hasAnyTask() {
    try {
        const task = await db.tasks.limit(1).toArray();
        return task.length > 0;
    } catch (error) {
        console.error("Error checking if any task exists:", error);
        return false;
    }
}

export async function fetchAllExpiredTasks() {
    try {
        const now = new Date();
        const tasks = await db.tasks.where("expirationDate").belowOrEqual(now).toArray();
        return tasks;
    } catch (error) {
        console.error("Erro ao buscar tarefas expiradas:", error);
        return [];
    }
}
