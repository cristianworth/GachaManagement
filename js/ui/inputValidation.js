import { validateNumberInput } from '../utils/validationUtils.js';

export function initializeNumberInputValidation() {
    var inputValidateNumberInput = function(event) {
        validateNumberInput(event.target);
    };

    document.getElementById('expirationDay').addEventListener('input', inputValidateNumberInput);
    document.getElementById('expirationHour').addEventListener('input', inputValidateNumberInput);
}
