const db = new Dexie("GachaManagement");

db.version(1).stores({
    games: '++id, description, abbreviation, img, capStamina, staminaPerMinute, currentStamina, maxStaminaAt, dateMaxStamina, pendingTasks',
    tasks: '++id, description, expirationDate, isDone, refreshType, gameId, gameDescription',
});

db.open().then(populateInitialData).catch((error) => {
    console.error("Failed to open the database:", error);
});

async function populateInitialData() {
    console.log('Do something afeter open database.');
    await populateInitialGames();
    await populateInitialTasks();
    await routineUpdateExpiratedTasks();
}

async function clearDatabase() {
    try {
        // Apaga todos os registros das tabelas
        await db.games.clear(); // Limpa a tabela de jogos
        await db.tasks.clear(); // Limpa a tabela de tarefas

        console.log("Banco de dados resetado com sucesso!");
    } catch (error) {
        console.error("Erro ao resetar o banco de dados:", error);
    }
}

async function routineUpdateExpiratedTasks() {
    var expiredTasks = await fetchAllExpiredTasks();

    expiredTasks.forEach(task => {
        var daysToRefresh = RefreshTypeEnum.BuscaDiasPorId(task.refreshType);
        if (!daysToRefresh) return;

        const expiratedDate = new Date(task.expirationDate);
        task.expirationDate.setDate(expiratedDate.getDate() + daysToRefresh);
        console.log(`updated ${task.gameDescription} expirated task ${task.description} from date ${formatDate(expiratedDate)} to ${formatDate(task.expirationDate)}`);
        // updateTask(task);
    });
}