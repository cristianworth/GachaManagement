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
