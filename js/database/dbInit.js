// js\database\dbInit.js
import { populateInitialGames } from './gameDB.js'
import { updateTask, populateInitialTasks, fetchAllOverdueTasks } from './taskDB.js'
import { displayAllTasks } from '../ui/taskUI.js'
import RefreshTypeEnum from '../enums/RefreshTypeEnum.js'
import { formatDateForDisplay } from '../utils/dateUtils.js';

const db = new Dexie("GachaManagement");

db.version(1).stores({
    games: '++id, description, abbreviation, img, capStamina, staminaPerMinute, currentStamina, maxStaminaAt, dateMaxStamina, pendingTasks, color',
    tasks: '++id, description, expirationDate, isDone, refreshType, gameId, gameDescription',
});

db.open().then(populateInitialData).catch((error) => {
    console.error("Failed to open the database:", error);
});

export async function populateInitialData() {
    await populateInitialGames();
    await populateInitialTasks();
    await updateExpiratedTasksRoutine();
}

export async function clearDatabase() {
    try {
        await db.delete(); // Deleta todo o banco, incluindo tabelas e autoincrement
        await db.open();   // Reabre o banco para recriação automática

        console.log("Banco de dados resetado com sucesso!");
    } catch (error) {
        console.error("Erro ao resetar o banco de dados:", error);
    }
}

export async function updateExpiratedTasksRoutine() {
    var expiredTasks = await fetchAllOverdueTasks();

    if (expiredTasks) {     
        expiredTasks.forEach(task => {
            var daysToRefresh = RefreshTypeEnum.findDaysById(task.refreshType);
            if (!daysToRefresh) return;
        
            task.isDone = false;
            const expiratedDate = new Date(task.expirationDate);
            task.expirationDate.setDate(expiratedDate.getDate() + daysToRefresh);
            console.log(`updated ${task.gameDescription} expirated task ${task.description} from date ${formatDateForDisplay(expiratedDate)} to ${formatDateForDisplay(task.expirationDate)}`);
            
            updateTask(task);
        });

        displayAllTasks();
    }
}

export default db;