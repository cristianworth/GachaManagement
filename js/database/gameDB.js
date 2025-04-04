
// js\database\gameDB.js
import db from './dbInit.js'
import { allGames } from '../data/Game.js'

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
