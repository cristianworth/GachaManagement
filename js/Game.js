class Game {
    id;
    description;
    abbreviation;
    img;
    capStamina;
    staminaPerMinute; 
    currentStamina = 0; 
    maxStaminaAt = '';
    dateMaxStamina = new Date();
    pendingTasks = '';

    constructor(description, abbreviation, img, capStamina, staminaPerMinute) {
        this.description = description;
        this.abbreviation = abbreviation;
        this.img = img;
        this.capStamina = capStamina;
        this.staminaPerMinute = staminaPerMinute;
    }
}

var allGames = [];

allGames.push(new Game(description = 'Genshin Impact', abbreviation = 'GI', img = 'img/genshin-icon.png', capStamina = 200, staminaPerMinute = 8));
allGames.push(new Game(description = 'Honkai Star Rail', abbreviation = 'HSR', img = 'img/star-rail-icon.png', capStamina = 300, staminaPerMinute = 6));
allGames.push(new Game(description = 'Wuthering Waves', abbreviation = 'WuWa', img = 'img/wuthering-waves-icon.png', capStamina = 240, staminaPerMinute = 6));
allGames.push(new Game(description = 'Zenless Zone Zero', abbreviation = 'ZZZ', img = 'img/zzz-icon.png', capStamina = 240, staminaPerMinute = 6));
allGames.push(new Game(description = 'Snowbreak', abbreviation = 'SK', img = 'img/snowbreak-icon.png', capStamina = 240, staminaPerMinute = 6));
// allGames.push(new Game(description = 'Punishing Gray Raven', abbreviation = 'PGR', img = 'img/pgr-icon.png', capStamina = 240, staminaPerMinute = 6));
// allGames.push(new Game(description = 'Nikke', abbreviation = 'NKK', img = 'img/nikke-icon.png', capStamina = 1, staminaPerMinute = 1440));

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

async function populateInitialGames() {
    try {
        const hasGames = await hasAnyGame();

        if (!hasGames) {
            console.log("No games found. Populating initial data...");
            for (const game of allGames) {
                await addGame(game);
            }
        }
    } catch (error) {
        console.error("Error populating initial games data:", error);
    }
}

async function hasAnyGame() {
    try {
        const game = await db.games.limit(1).toArray();
        return game.length > 0;
    } catch (error) {
        console.error("Error checking if any game exists:", error);
        return false;
    }
}
