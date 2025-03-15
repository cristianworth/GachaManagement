class Tasks {
    constructor(id, description, expirationDate, isDone, refreshType, gameId, gameDescription) {
        this.id = id;
        this.description = description;
        this.expirationDate = expirationDate;
        this.isDone = isDone;
        this.refreshType = refreshType;
        this.gameId = gameId;
        this.gameDescription = gameDescription;
    }
}

var allTasks = [];

allTasks.push(new Tasks(id = 1, description = 'Spyral Abyss', expirationDate = '15/03/2025', isDone = 'S', refreshType = 'BiMonthly', gameId = 1, gameDescription = "Genshin Impact"));
allTasks.push(new Tasks(id = 2, description = 'Imaginarium Theater', expirationDate = '31/03/2025', isDone = 'N', refreshType = 'BiMonthly', gameId = 1, gameDescription = "Genshin Impact"));

async function addTaskIfNotExists(newTask) {
    // Method used to populate the initial set o data predefined on the Tasks.js file
    try {
        const taskFound = await fetchTaskById(newTask.id);

        if (!taskFound) {
            await addTask(newTask);
        }
    } catch (error) {
        console.error("Failed to add Task:", error);
    }
}

async function addTask(task) {
    try {
        await db.tasks.add(task);
        console.log("New Task added:", task);
    } catch (error) {
        console.error("Failed to add task:", error);
    }
}

async function updateTask(task) {
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

async function deleteTaskById(taskId) {
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

async function fetchAllTasks() {
    try {
        const tasks = await db.tasks.orderBy("expirationDate").toArray();
        console.log("Todas as tarefas:", tasks);
        return tasks;
    } catch (error) {
        console.error("Erro ao buscar todas as tarefas:", error);
        return [];
    }
}

async function fetchTaskById(id) {
    // Method to verify if the task exists
    try {
        const task = await db.tasks.get(id);
        return task;
    } catch (error) {
        console.error("Erro ao buscar a tarefa pelo ID:", error);
        return null;
    }
}

async function fetchTasksByGame(gameId) {
    try {
        var task = await db.tasks.where("gameId").equals(gameId).toArray();
        return task;
    } catch (error) {
        console.error("Failed to add game:", error);
    }
}

async function completeTask(taskId) {
    try {
        var task = await db.tasks.update(taskId, { status: "completed" });
        return task;
    } catch (error) {
        console.error("Failed to update game:", error);
    }
}
