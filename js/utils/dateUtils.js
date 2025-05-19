 // js\utils\dateUtils.js
 export function formatDateToDayHour(date) {
    const today = new Date();
    const diffMs = date - today;
    const diffHours = Math.ceil(diffMs / (1000 * 60 * 60)); // milissegundos para horas

    let day = date.getDate();
    let hour = date.getHours();
    let minutes = date.getMinutes();

    return `Day ${day} at ${hour}:${minutes < 10 ? '0' + minutes : minutes}  (${diffHours}h left)`;
}

export function calculateMaxStaminaDate(game) {
    let totalStaminaLeft = game.capStamina - game.currentStamina;
    let howManyMinutesUntilCapped = totalStaminaLeft * game.staminaPerMinute;

    let forecastDate = new Date();
    forecastDate.setMinutes(forecastDate.getMinutes() + howManyMinutesUntilCapped);

    return forecastDate;
}

export function getExpirationDate(expirationDay, expirationHour) {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + expirationDay);
    currentDate.setHours(currentDate.getHours() + expirationHour);

    return currentDate;
}

export function formatDateForInput(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function formatDateForDisplay(date) {
    const today = new Date();
    const diffMs = date - today;
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24)); // milissegundos para dias

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Janeiro é 0!
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes} (${diffDays}d left)`;
}
