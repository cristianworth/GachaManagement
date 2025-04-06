// tests\game.test.js
import { Game } from '../js/data/Game.js';
import { calculateMaxStaminaDate } from '../js/utils/dateUtils.js';

test('Game constructor should initialize properties correctly', () => {
    let game = new Game('Genshin Impact', 'GI', 'img.png', 120, 1, 'blue');

    expect(game.description).toBe('Genshin Impact');
    expect(game.capStamina).toBe(120);
    expect(game.staminaPerMinute).toBe(1);
});

test('Game calculates correct max stamina time', () => {
    const game = new Game('Test', 'T', '', 240, 6, '');
    game.currentStamina = 120;
    const date = calculateMaxStaminaDate(game);
    expect(date.getTime()).toBeGreaterThan(Date.now());
});