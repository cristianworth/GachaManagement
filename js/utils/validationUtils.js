// js\utils\validationUtils.js
export function validateNumberInput(input) {
    input.value = input.value.replace(/[^0-9]/g, '');  // Removes non-numeric characters (.,)
}
