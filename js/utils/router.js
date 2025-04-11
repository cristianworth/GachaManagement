// js/utils/router.js
import NavigationService from '../services/navigation.service.js';

class Router {
  static routes = {
    '/': 'games',
    '/games/create': 'createGame',
    '/tasks': 'taskList', 
    '/tasks/create': 'createTask'
  };

  static init() {
    // Initialize navigation handlers
    NavigationService.init();
    
    // Setup history listeners
    window.addEventListener('popstate', () => this.route());
    
    // Initial route
    this.route();
  }

  static navigateTo(path) {
    history.pushState({}, '', path);
    this.route();
  }

  static route() {
    const path = window.location.pathname;
    const view = this.routes[path] || 'games';
    
    document.querySelectorAll('[data-page]').forEach(el => {
      el.style.display = el.dataset.page === view ? 'block' : 'none';
    });

    // Load data when navigating to specific views
    switch(view) {
      case 'games':
        import('../ui/gameUI.js').then(module => module.displayAllGames());
        break;
      case 'taskList':
        import('../ui/taskUI.js').then(module => module.displayAllTasks());
        break;
    }
  }
}

export default Router;