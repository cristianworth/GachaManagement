import { Game } from '../js/data/Game.js';

test('Game constructor should initialize properties correctly', () => {
    let game = new Game(1, 'Genshin Impact', 'GI', 'img.png', 120, 1, 'blue');

    expect(game.id).toBe(1);
    expect(game.description).toBe('Genshin Impact');
    expect(game.capStamina).toBe(120);
    expect(game.staminaPerMinute).toBe(1);
});
