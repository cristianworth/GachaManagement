// tests\game.test.js
import { Game } from '../js/data/Game.js';

test('Game constructor should initialize properties correctly', () => {
    let game = new Game('Genshin Impact', 'GI', 'img.png', 120, 1, 'blue');

    expect(game.description).toBe('Genshin Impact');
    expect(game.capStamina).toBe(120);
    expect(game.staminaPerMinute).toBe(1);
});
