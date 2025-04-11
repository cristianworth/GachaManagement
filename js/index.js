// js/index.js
import Router from './utils/router.js';
import { initializeGameForm, initializeTaskForm } from './ui/formHandler.js';
import { populateGameDropDown, populateRefreshTypeDropDown } from './ui/dropdownHandler.js';
import { initializeNumberInputValidation } from './ui/inputValidation.js';

document.addEventListener("DOMContentLoaded", function () {
  // Single initialization point
  Router.init();

  // Initialize application modules
  initializeGameForm();
  initializeTaskForm();
  populateGameDropDown();
  populateRefreshTypeDropDown();
  initializeNumberInputValidation();
});