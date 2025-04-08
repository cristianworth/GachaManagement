// js\index.js
import { initializeGameForm, initializeTaskForm } from './ui/formHandler.js';
import { displayAllGames } from './ui/gameUI.js';
import { displayAllTasks } from './ui/taskUI.js';
import { populateGameDropDown, populateRefreshTypeDropDown } from './ui/dropdownHandler.js';
import { initializeNumberInputValidation } from './ui/inputValidation.js';
import Router from './utils/router.js';

document.addEventListener("DOMContentLoaded", function () {
    Router.init();
    document.getElementById('viewTasksBtn')?.addEventListener('click', () => {
        Router.navigateTo('/tasks');
    });
    
    document.getElementById('createTaskBtn')?.addEventListener('click', () => {
        Router.navigateTo('/tasks/create');
    });
    
    document.getElementById('backToListBtn')?.addEventListener('click', () => {
        Router.navigateTo('/tasks');
    });
    initializeGameForm();
    initializeTaskForm();
    displayAllGames();
    displayAllTasks();
    populateGameDropDown();
    populateRefreshTypeDropDown();
    initializeNumberInputValidation();
});
