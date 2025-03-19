// colorUtils.js
export default function getRandomColor() {
    const colors = [
        "#d9d9d9", // Cinza Claro
        "#f2e6d9", // Bege Claro
        "#ffcc99", // Pêssego Claro
        "#b3ffcc", // Menta Claro
        "#e6b3ff"  // Lilás Claro
    ];
    
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}