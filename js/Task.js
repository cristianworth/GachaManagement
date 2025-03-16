class Task {
    id;
    description;
    expirationDate;
    isDone = false;
    refreshType;
    gameId;
    gameDescription;

    constructor(description, expirationDate, refreshType, gameId, gameDescription) {
        this.description = description;
        this.expirationDate = expirationDate;
        this.refreshType = refreshType;
        this.gameId = gameId;
        this.gameDescription = gameDescription;
    }
}

var allTasks = [];

allTasks.push(new Task('Spyral Abyss', new Date(2025, 2, 16, 6), RefreshTypeEnum.BuscaIdPorNome('FullMonth'), 0, "Genshin Impact"));
allTasks.push(new Task('Imaginarium Theater', new Date(2025, 3, 1, 6), RefreshTypeEnum.BuscaIdPorNome('FullMonth'), 0, "Genshin Impact"));

allTasks.push(new Task('Memory of Chaos', new Date(2025, 2, 31, 6), RefreshTypeEnum.BuscaIdPorNome('SixWeeks'), 1, "Honkai Star Rail"));
allTasks.push(new Task('Pure Fiction', new Date(2025, 2, 17, 6), RefreshTypeEnum.BuscaIdPorNome('SixWeeks'), 1, "Honkai Star Rail"));
allTasks.push(new Task('Apocalyptic Shadow', new Date(2025, 3, 14, 6), RefreshTypeEnum.BuscaIdPorNome('SixWeeks'), 1, "Honkai Star Rail"));
allTasks.push(new Task('Echo of War', new Date(2025, 2, 17, 6), RefreshTypeEnum.BuscaIdPorNome('Weekly'), 1, "Honkai Star Rail"));

allTasks.push(new Task('Tower of Adversity', new Date(2025, 2, 31, 6), RefreshTypeEnum.BuscaIdPorNome('FourWeeks'), 2, "Wuthering Waves"));
allTasks.push(new Task('Whimpering Waves', new Date(2025, 2, 17, 6), RefreshTypeEnum.BuscaIdPorNome('BiMonthly'), 2, "Wuthering Waves"));
allTasks.push(new Task('Illusive Realm', new Date(2025, 2, 17, 6), RefreshTypeEnum.BuscaIdPorNome('Weekly'), 2, "Wuthering Waves"));

allTasks.push(new Task('Shiyu Defense', new Date(2025, 2, 28, 6), RefreshTypeEnum.BuscaIdPorNome('BiMonthly'), 3, "Zenless Zone Zero"));
allTasks.push(new Task('Deadly Assault', new Date(2025, 2, 21, 6), RefreshTypeEnum.BuscaIdPorNome('Fortnight'), 3, "Zenless Zone Zero"));
allTasks.push(new Task('Hollow Zero', new Date(2025, 2, 17, 6), RefreshTypeEnum.BuscaIdPorNome('Weekly'), 3, "Zenless Zone Zero"));
allTasks.push(new Task('Notorious Hunt', new Date(2025, 2, 17, 6), RefreshTypeEnum.BuscaIdPorNome('Weekly'), 3, "Zenless Zone Zero"));

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

async function completeTask(taskId, isDone) {
    try {
        var task = await db.tasks.update(taskId, { isDone: isDone });
        return task;
    } catch (error) {
        console.error("Failed to update game:", error);
    }
}

async function populateInitialTasks() {
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

async function hasAnyTask() {
    try {
        const task = await db.tasks.limit(1).toArray();
        return task.length > 0;
    } catch (error) {
        console.error("Error checking if any task exists:", error);
        return false;
    }
}

async function fetchAllExpiredTasks() {
    try {
        const now = new Date();
        const tasks = await db.tasks.where("expirationDate").belowOrEqual(now).toArray();
        return tasks;
    } catch (error) {
        console.error("Erro ao buscar tarefas expiradas:", error);
        return [];
    }
}
