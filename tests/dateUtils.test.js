import { calculateMaxStaminaDate } from '../js/utils/dateUtils.js';

test('calculateMaxStaminaDate should return correct date', () => {
    let game = { currentStamina: 50, capStamina: 240, staminaPerMinute: 8 };
    let result = calculateMaxStaminaDate(game);

    expect(result).toBeInstanceOf(Date);
    expect(result > new Date()).toBe(true); // Deve ser uma data futura
});
