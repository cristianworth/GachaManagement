const db = new Dexie("GachaManagement");

db.version(1).stores({
    games: '++id, description, abbreviation, img, capStamina, staminaPerMinute, currentStamina, maxStaminaAt, dateMaxStamina, pendingTasks',
    tasks: '++id, description, expirationDate, isDone, refreshType, gameId, gameDescription',
});

db.open().then(populateInitialData).catch((error) => {
    console.error("Failed to open the database:", error);
});

async function populateInitialData() {
    try {
        for (const game of allGames) {
            await addGameIfNotExists(game);
        }

        for (const task of allTasks) {
            await addTaskIfNotExists(task);
        }
    } catch (error) {
        console.error("Error populating initial data:", error);
    }
}

async function addGameIfNotExists(newGame) {
    // Method used to populate the initial set o data predefined on the Game.js file
    try {
        const gameFound = await fetchGameById(newGame.id);

        if (!gameFound) {
            await addGame(newGame);
        }
    } catch (error) {
        console.error("Failed to add game:", error);
    }
}

async function addGame(game) {
    try {
        game.id = await getNextGameId();
        await db.games.add(game);
        console.log("New Game added:", game);
    } catch (error) {
        console.error("Failed to add game:", error);
    }
}

async function getNextGameId() {
    try {
        var maxId = await db.games.orderBy('id').last();
        return ++maxId.id;
    } catch (error) {
        console.error("Failed to get max game id:", error);
    }
}

async function updateGame(game) {
    // Method used to mainly update the amout of stamina on the main screen
    if (!game.id) {
        return;
    }

    try {
        await db.games.update(game.id, game);
    } catch (error) {
        console.error("Erro ao atualizar o jogo:", error);
    }
}

async function deleteGameById(gameId) {
    // Not really used at the moment but can be used to update an existing Game, 
    //      delet it and then when the pages reload the populateInitialData will create it again
    // Examples:
    // deleteGameById(2);
    // deleteGameById(6);
    // deleteGameById(7);
    try {
        const gameFound = await fetchGameById(gameId);

        if (gameFound) {
            await db.games.delete(gameId);
        } else {
            console.log(`Game with ID ${gameId} not found in the database.`);
        }
    } catch (error) {
        console.error(`Failed to delete game with ID ${gameId}:`, error);
    }
}

async function fetchAllGames() {
    // Method used to load allGames into the main page. 
    try {
        const games = await db.games.orderBy("dateMaxStamina").toArray();
        console.log("Todos os jogos:", games);
        return games;
    } catch (error) {
        console.error("Erro ao buscar todos os jogos:", error);
        return [];
    }
}

async function fetchGameById(id) {
    // Method to verify if the game exists
    try {
        const game = await db.games.get(id);
        return game;
    } catch (error) {
        console.error("Erro ao buscar o jogo pelo ID:", error);
        return null;
    }
}

async function fetchGameById(id) {
    // Method to verify if the game exists
    try {
        const game = await db.games.get(id);
        return game;
    } catch (error) {
        console.error("Erro ao buscar o jogo pelo ID:", error);
        return null;
    }
}

async function addTask(task) {
    try {
        task.id = await getNextTaskId();
        await db.tasks.add(task);
        console.log("New Task added:", task);
    } catch (error) {
        console.error("Failed to add task:", error);
    }
}

async function getNextTaskId() {
    try {
        var maxId = await db.tasks.orderBy('id').last();
        return ++maxId.id;
    } catch (error) {
        console.error("Failed to get max task id:", error);
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

async function fetchTasksByGame(gameId) {
    try {
        var task = await db.tasks.where("gameId").equals(gameId).toArray();
        return task;
    } catch (error) {
        console.error("Failed to add game:", error);
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

async function completeTask(taskId) {
    try {
        var task = await db.tasks.update(taskId, { status: "completed" });
        return task;
    } catch (error) {
        console.error("Failed to update game:", error);
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
