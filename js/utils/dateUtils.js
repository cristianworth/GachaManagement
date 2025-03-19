 // dateUtils.js
 function formatDateToDayHour(currentDate) {
    let day = currentDate.getDate();
    let hour = currentDate.getHours();
    let minutes = currentDate.getMinutes();

    return `Day ${day} at ${hour}:${minutes < 10 ? '0' + minutes : minutes}`;
}

function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Janeiro é 0!
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}