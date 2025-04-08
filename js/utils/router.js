// js/utils/router.js
class Router {
    static routes = {
      '/': 'home',
      '/tasks': 'taskList', 
      '/tasks/create': 'taskForm'
    };
  
    static init() {
      window.addEventListener('popstate', () => this.route());
      this.route();
    }
  
    static navigateTo(path) {
      history.pushState({}, '', path);
      this.route();
    }
  
    static route() {
      const path = window.location.pathname;
      const view = this.routes[path] || 'home';
      
      document.querySelectorAll('[data-page]').forEach(el => {
        el.style.display = el.dataset.page === view ? 'block' : 'none';
      });
    }
  }
  
  export default Router;