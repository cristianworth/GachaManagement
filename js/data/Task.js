// Task.js file
import RefreshTypeEnum from '../enums/RefreshTypeEnum.js'

export class Task {
    id;
    description;
    expirationDate;
    isDone = false;
    refreshType;
    gameId;
    gameDescription;
    game;

    constructor(description, expirationDate, refreshType, gameId, gameDescription) {
        this.description = description;
        this.expirationDate = expirationDate;
        this.refreshType = refreshType;
        this.gameId = gameId;
        this.gameDescription = gameDescription;
    }
}

export const allTasks = [];

allTasks.push(new Task('Spyral Abyss', new Date(2025, 2, 16, 6), RefreshTypeEnum.BuscaIdPorNome('Monthly'), 1, "Genshin Impact"));
allTasks.push(new Task('Imaginarium Theater', new Date(2025, 3, 1, 6), RefreshTypeEnum.BuscaIdPorNome('Monthly'), 1, "Genshin Impact"));

allTasks.push(new Task('Memory of Chaos', new Date(2025, 2, 31, 6), RefreshTypeEnum.BuscaIdPorNome('SixWeeks'), 2, "Honkai Star Rail"));
allTasks.push(new Task('Pure Fiction', new Date(2025, 2, 17, 6), RefreshTypeEnum.BuscaIdPorNome('SixWeeks'), 2, "Honkai Star Rail"));
allTasks.push(new Task('Apocalyptic Shadow', new Date(2025, 3, 14, 6), RefreshTypeEnum.BuscaIdPorNome('SixWeeks'), 2, "Honkai Star Rail"));
allTasks.push(new Task('Echo of War', new Date(2025, 2, 17, 6), RefreshTypeEnum.BuscaIdPorNome('Weekly'), 2, "Honkai Star Rail"));
allTasks.push(new Task('Simulated Universe', new Date(2025, 2, 17, 6), RefreshTypeEnum.BuscaIdPorNome('Weekly'), 2, "Honkai Star Rail"));

allTasks.push(new Task('Tower of Adversity', new Date(2025, 2, 31, 6), RefreshTypeEnum.BuscaIdPorNome('FourWeeks'), 3, "Wuthering Waves"));
allTasks.push(new Task('Whimpering Waves', new Date(2025, 2, 17, 6), RefreshTypeEnum.BuscaIdPorNome('FourWeeks'), 3, "Wuthering Waves"));
allTasks.push(new Task('Illusive Realm', new Date(2025, 2, 17, 6), RefreshTypeEnum.BuscaIdPorNome('Weekly'), 3, "Wuthering Waves"));
allTasks.push(new Task('Weekly Boss', new Date(2025, 2, 17, 6), RefreshTypeEnum.BuscaIdPorNome('Weekly'), 3, "Wuthering Waves"));

allTasks.push(new Task('Shiyu Defense', new Date(2025, 2, 28, 6), RefreshTypeEnum.BuscaIdPorNome('BiMonthly'), 4, "Zenless Zone Zero"));
allTasks.push(new Task('Deadly Assault', new Date(2025, 2, 21, 6), RefreshTypeEnum.BuscaIdPorNome('TwoWeeks'), 4, "Zenless Zone Zero"));
allTasks.push(new Task('Hollow Zero', new Date(2025, 2, 17, 6), RefreshTypeEnum.BuscaIdPorNome('Weekly'), 4, "Zenless Zone Zero"));
allTasks.push(new Task('Notorious Hunt', new Date(2025, 2, 17, 6), RefreshTypeEnum.BuscaIdPorNome('Weekly'), 4, "Zenless Zone Zero"));
