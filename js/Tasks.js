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