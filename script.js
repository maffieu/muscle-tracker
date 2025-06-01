
const workouts = {
    monday: [
        ["Hack Squat", 20],
        ["Lat Pulldown", 42],
        ["Incline DB Press", 10],
        ["Chest Supported Row", 10],
        ["Cuban Press", 15],
        ["Preacher Curl", 10]
    ],
    wednesday: [
        ["Barbell Deadlift", 20],
        ["Overhead Press", 15],
        ["Deficit Push-Up", 0],
        ["Leg Extension", 40],
        ["Calf Raises", 20]
    ],
    friday: [
        ["Lat Pulldown", 42],
        ["Incline Machine Press", 20],
        ["Lateral Raises", 5],
        ["Tricep Extensions", 15]
    ]
};

function showDay(day) {
    const container = document.getElementById("workout-container");
    container.innerHTML = `<h2>${day.charAt(0).toUpperCase() + day.slice(1)}</h2>`;
    workouts[day].forEach(([exercise, baseWeight], index) => {
        const storedWeight = localStorage.getItem(`${day}-${index}`) || baseWeight;
        container.innerHTML += `
            <div class="exercise">
                <strong>${exercise}</strong><br>
                Weight: <input type="number" value="${storedWeight}" onchange="saveWeight('${day}', ${index}, this.value)"> kg
            </div>`;
    });
}

function saveWeight(day, index, value) {
    localStorage.setItem(`${day}-${index}`, value);
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
}
