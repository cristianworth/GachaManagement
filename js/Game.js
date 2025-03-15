class Game {
    constructor(id, description, abbreviation, img, capStamina, staminaPerMinute, currentStamina = 0, maxStaminaAt = 'not defined', dateMaxStamina = new Date(), pendingTasks = '') {
        this.id = id;
        this.description = description;
        this.abbreviation = abbreviation;
        this.img = img;
        this.capStamina = capStamina;
        this.staminaPerMinute = staminaPerMinute;
        this.currentStamina = currentStamina;
        this.maxStaminaAt = maxStaminaAt;
        this.dateMaxStamina = dateMaxStamina;
        this.pendingTasks = pendingTasks;
    }
}

var allGames = [];

allGames.push(new Game(id = 1, description = 'Genshin Impact', abbreviation = 'GI', img = 'img/genshin-icon.png', capStamina = 200, staminaPerMinute = 8, currentStamina = 0, maxStaminaAt = '', dateMaxStamina = new Date(), pendingTasks = ''));
// allGames.push(new Game(id = 2, description = 'Punishing Gray Raven', abbreviation = 'PGR', img = 'img/pgr-icon.png', capStamina = 240, staminaPerMinute = 6, currentStamina = 0, maxStaminaAt = '', dateMaxStamina = new Date(), pendingTasks = ''));
allGames.push(new Game(id = 3, description = 'Honkai Star Rail', abbreviation = 'HSR', img = 'img/star-rail-icon.png', capStamina = 300, staminaPerMinute = 6, currentStamina = 0, maxStaminaAt = '', dateMaxStamina = new Date(), pendingTasks = ''));
allGames.push(new Game(id = 4, description = 'Wuthering Waves', abbreviation = 'WuWa', img = 'img/wuthering-waves-icon.png', capStamina = 240, staminaPerMinute = 6, currentStamina = 0, maxStaminaAt = '', dateMaxStamina = new Date(), pendingTasks = ''));
allGames.push(new Game(id = 5, description = 'Zenless Zone Zero', abbreviation = 'ZZZ', img = 'img/zzz-icon.png', capStamina = 240, staminaPerMinute = 6, currentStamina = 0, maxStaminaAt = '', dateMaxStamina = new Date(), pendingTasks = ''));
// allGames.push(new Game(id = 6, description = 'Nikke', abbreviation = 'NKK', img = 'img/nikke-icon.png', capStamina = 1, staminaPerMinute = 1440, currentStamina = 0, maxStaminaAt = '', dateMaxStamina = new Date(), pendingTasks = ''));
allGames.push(new Game(id = 7, description = 'Snowbreak', abbreviation = 'SK', img = 'img/snowbreak-icon.png', capStamina = 240, staminaPerMinute = 6, currentStamina = 0, maxStaminaAt = '', dateMaxStamina = new Date(), pendingTasks = ''));

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
        await db.games.add(game);
        console.log("New Game added:", game);
    } catch (error) {
        console.error("Failed to add game:", error);
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
