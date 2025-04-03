// js\ui\gameUI.js
import { Game } from '../data/Game.js';
import { fetchGameById, fetchAllGames, updateGame, addGame } from '../database/gameDB.js';
import { calculateMaxStaminaDate, formatDateToDayHour } from '../utils/dateUtils.js';
import { clearFieldsFromGameForm } from './formHandler.js';
import { getRandomColor } from '../utils/colorUtils.js';

export async function displayAllGames() {
    const games = await fetchAllGames();
    const gameListBody = document.getElementById("gameListBody");
    gameListBody.innerHTML = ''; // clear data

    games.forEach(game => {
        const row = createGameRow(game);
        gameListBody.appendChild(row);
        addGameEventListeners(game);
    });
}

function createGameRow(game) {
    let row = document.createElement("tr");

    row.innerHTML = `
        <td>
            <img src=${game.img} alt="${game.description} Icon" class="icon">
        </td>
        <td>${game.description}</td>
        <td>
            <textarea id="pendingTask${game.id}" spellcheck="false">${game.pendingTasks || ''}</textarea>
        </td>
        <td>
            <input class="input-centered spacing-left" id="currentStamina${game.id}" type="number" value="${game.currentStamina | ''}" />
            <button class="spacing-left" id="edit-game-${game.id}">Edit</button>
        </td>
        <td>
            <span id="newMaxStaminaAt${game.id}" class="spacing-left red-text">${game.maxStaminaAt}<\span>
        </td>
    `;

    return row;
}

export function addGameEventListeners(game) {
    const editGame = document.getElementById(`edit-game-${game.id}`);

    if (editGame) {
        editGame.addEventListener("click", () => handleEditGame(game.id));
    }
}

async function handleEditGame(gameId) {
    let game = await fetchGameById(gameId);

    const currentStamina = parseInt(document.getElementById(`currentStamina${game.id}`).value, 10);
    const pendingTask = document.getElementById(`pendingTask${gameId}`).value;

    if (!isNaN(currentStamina)) {
        game.currentStamina = currentStamina;
        game.pendingTasks = pendingTask;
        game.dateMaxStamina = calculateMaxStaminaDate(game);
        game.maxStaminaAt = formatDateToDayHour(game.dateMaxStamina);
        
        await updateGame(game);
        await displayAllGames();
    } else {
        alert("Please enter a valid number for stamina.");
    }
}

export async function handleAddGame() {
    const gameDescription = document.getElementById("gameDescription").value;
    const abbreviation = document.getElementById("abbreviation").value;
    const capStamina = document.getElementById("capStamina").value;
    const staminaPerMinute = document.getElementById("staminaPerMinute").value;

    const newGame = new Game(
        gameDescription, 
        abbreviation, 
        'img/default-icon.png',
        capStamina,
        staminaPerMinute,
        getRandomColor()
    );

    await addGame(newGame);
    displayAllGames();
    clearFieldsFromGameForm();
}
