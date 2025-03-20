// database.js file
import { populateInitialGames } from './Game.js'
import { populateInitialTasks, fetchAllExpiredTasks } from './Task.js'
import RefreshTypeEnum from './enums/RefreshTypeEnum.js'

const db = new Dexie("GachaManagement");
import { formatDate } from './utils/dateUtils.js';

db.version(1).stores({
    games: '++id, description, abbreviation, img, capStamina, staminaPerMinute, currentStamina, maxStaminaAt, dateMaxStamina, pendingTasks, color',
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
        await db.delete(); // Deleta todo o banco, incluindo tabelas e autoincrement
        await db.open();   // Reabre o banco para recriação automática

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
        updateTask(task);
    });
}

export default db;