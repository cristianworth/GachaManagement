class Game {
    constructor(id, description, abbreviation, img, capStamina, staminaPerMinute, currentStamina = 0, maxStaminaAt = 'not defined', dateMaxStamina = new Date(), pendingTasks = '') {
        this.id = id;
        this.description = description;
        this.abbreviation = abbreviation;
        this.img = img;
        this.capStamina = capStamina;
        this.staminaPerMinute = staminaPerMinute;
        this.currentStamina = currentStamina;
        this.maxStaminaAt = maxStaminaAt;
        this.dateMaxStamina = dateMaxStamina;
        this.pendingTasks = pendingTasks;
    }
}

var allGames = [];

allGames.push(new Game(id = 1, description = 'Genshin Impact', abbreviation = 'GI', img = 'img/genshin-icon.png', capStamina = 200, staminaPerMinute = 8, currentStamina = 0, maxStaminaAt = '', dateMaxStamina = new Date(), pendingTasks = ''));
// allGames.push(new Game(id = 2, description = 'Punishing Gray Raven', abbreviation = 'PGR', img = 'img/pgr-icon.png', capStamina = 240, staminaPerMinute = 6, currentStamina = 0, maxStaminaAt = '', dateMaxStamina = new Date(), pendingTasks = ''));
allGames.push(new Game(id = 3, description = 'Honkai Star Rail', abbreviation = 'HSR', img = 'img/star-rail-icon.png', capStamina = 300, staminaPerMinute = 6, currentStamina = 0, maxStaminaAt = '', dateMaxStamina = new Date(), pendingTasks = ''));
allGames.push(new Game(id = 4, description = 'Wuthering Waves', abbreviation = 'WuWa', img = 'img/wuthering-waves-icon.png', capStamina = 240, staminaPerMinute = 6, currentStamina = 0, maxStaminaAt = '', dateMaxStamina = new Date(), pendingTasks = ''));
allGames.push(new Game(id = 5, description = 'Zenless Zone Zero', abbreviation = 'ZZZ', img = 'img/zzz-icon.png', capStamina = 240, staminaPerMinute = 6, currentStamina = 0, maxStaminaAt = '', dateMaxStamina = new Date(), pendingTasks = ''));
// allGames.push(new Game(id = 6, description = 'Nikke', abbreviation = 'NKK', img = 'img/nikke-icon.png', capStamina = 1, staminaPerMinute = 1440, currentStamina = 0, maxStaminaAt = '', dateMaxStamina = new Date(), pendingTasks = ''));
allGames.push(new Game(id = 7, description = 'Snowbreak', abbreviation = 'SK', img = 'img/snowbreak-icon.png', capStamina = 240, staminaPerMinute = 6, currentStamina = 0, maxStaminaAt = '', dateMaxStamina = new Date(), pendingTasks = ''));
