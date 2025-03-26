import { fetchAllGames } from '../database/gameDB.js';
import RefreshTypeEnum from '../enums/RefreshTypeEnum.js';

export async function populateGameDropDown() {
    let games = await fetchAllGames();
    const selectGame = document.getElementById("gameId");

    games.forEach(game => {
        let option = document.createElement("option");
        option.value = game.id;
        option.textContent = game.description;
        selectGame.appendChild(option);
    });
}

export function populateRefreshTypeDropDown() {
    const selectRefreshType = document.getElementById("refreshType");

    RefreshTypeEnum.values.forEach(rType => {
        let option = document.createElement("option");
        option.value = rType.id;
        option.textContent = rType.value;
        selectRefreshType.appendChild(option);
    })
}
