// js/services/navigation.service.js
import Router from '../utils/router.js';

class NavigationService {
  static init() {
    this._bindGameNavigations();
    this._bindTaskNavigations();
    this._bindFormNavigations();
  }

  static _bindGameNavigations() {
    document.getElementById('viewTasksBtn')?.addEventListener('click', () => {
      Router.navigateTo('/tasks');
    });
    
    document.getElementById('createGameBtn')?.addEventListener('click', () => {
      Router.navigateTo('/games/create');
    });
  }

  static _bindTaskNavigations() {
    document.getElementById('backToGamesFromTasksBtn')?.addEventListener('click', () => {
      Router.navigateTo('/');
    });
    
    document.getElementById('createTaskBtn')?.addEventListener('click', () => {
      Router.navigateTo('/tasks/create');
    });
  }

  static _bindFormNavigations() {
    document.getElementById('backToGamesBtn')?.addEventListener('click', () => {
      Router.navigateTo('/');
    });
    
    document.getElementById('backToTasksBtn')?.addEventListener('click', () => {
      Router.navigateTo('/tasks');
    });
  }
}

export default NavigationService;