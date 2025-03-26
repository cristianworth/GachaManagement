import { initializeGameForm, initializeTaskForm } from './ui/formHandler.js';
import { displayAllGames } from './ui/gameUI.js';
import { displayAllTasks } from './ui/taskUI.js';
import { populateGameDropDown, populateRefreshTypeDropDown } from './ui/dropdownHandler.js';
import { initializeNumberInputValidation } from './ui/inputValidation.js';

document.addEventListener("DOMContentLoaded", function () {
    initializeGameForm();
    initializeTaskForm();
    displayAllGames();
    displayAllTasks();
    populateGameDropDown();
    populateRefreshTypeDropDown();
    initializeNumberInputValidation();
});
