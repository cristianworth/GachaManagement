// Game.js file
import db from './database.js';

export class Game {
    id;
    description;
    abbreviation;
    img;
    capStamina;
    staminaPerMinute;
    color;
    currentStamina = 0; 
    maxStaminaAt = '';
    dateMaxStamina = new Date();
    pendingTasks = '';

    constructor(description, abbreviation, img, capStamina, staminaPerMinute, color) {
        this.description = description;
        this.abbreviation = abbreviation;
        this.img = img;
        this.capStamina = capStamina;
        this.staminaPerMinute = staminaPerMinute;
        this.color = color;
    }
}


export const allGames = [];
allGames.push(new Game('Genshin Impact', 'GI', 'img/genshin-icon.png', 200, 8, '#b3d9ff'));
allGames.push(new Game('Honkai Star Rail', 'HSR', 'img/star-rail-icon.png', 300, 6, '#d1f0d1'));
allGames.push(new Game('Wuthering Waves', 'WuWa', 'img/wuthering-waves-icon.png', 240, 6, '#ffffb3'));
allGames.push(new Game('Zenless Zone Zero', 'ZZZ', 'img/zzz-icon.png', 240, 6, '#e6ccff'));
allGames.push(new Game('Snowbreak', 'SK', 'img/snowbreak-icon.png', 240, 6, '#ffb3b3'));
// allGames.push(new Game('Punishing Gray Raven', 'PGR', 'img/pgr-icon.png', 240, 6, '#d9d9d9'));
// allGames.push(new Game('Nikke', 'NKK', 'img/nikke-icon.png', 1, 1440, '#f2e6d9'));

export async function addGame(game) {
    try {
        await db.games.add(game);
        console.log("New Game added:", game);
    } catch (error) {
        console.error("Failed to add game:", error);
    }
}

export async function updateGame(game) {
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

export async function deleteGameById(gameId) {
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

export async function fetchAllGames() {
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

export async function fetchGameById(id) {
    // Method to verify if the game exists
    try {
        const game = await db.games.get(id);
        return game;
    } catch (error) {
        console.error("Erro ao buscar o jogo pelo ID:", error);
        return null;
    }
}

export async function populateInitialGames() {
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

export async function hasAnyGame() {
    try {
        const game = await db.games.limit(1).toArray();
        return game.length > 0;
    } catch (error) {
        console.error("Error checking if any game exists:", error);
        return false;
    }
}
