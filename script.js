
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
    container.innerHTML = `<h2>${capitalize(day)}</h2>`;
    workouts[day].forEach(([exercise, baseWeight], index) => {
        const key = `${day}-${index}`;
        container.innerHTML += `
            <div class="exercise">
                <strong>${exercise}</strong><br>
                Weight: <input type="number" id="${key}-input" placeholder="${baseWeight}" /> kg
                <button onclick="logWeight('${key}')">Log</button>
                <div id="${key}-history"></div>
            </div>`;
        showHistory(key);
    });
}

function logWeight(key) {
    const input = document.getElementById(`${key}-input`);
    const weight = parseFloat(input.value);
    if (!weight) return;
    const log = JSON.parse(localStorage.getItem(key) || "[]");
    const date = new Date().toISOString().split('T')[0];
    log.unshift({ date, weight });
    if (log.length > 30) log.pop(); // Keep only last 30 entries
    localStorage.setItem(key, JSON.stringify(log));
    showHistory(key);
    input.value = "";
}

function showHistory(key) {
    const container = document.getElementById(`${key}-history`);
    const log = JSON.parse(localStorage.getItem(key) || "[]");
    if (log.length === 0) {
        container.innerHTML = "<em>No history yet.</em>";
        return;
    }
    let table = "<table><tr><th>Date</th><th>Weight (kg)</th></tr>";
    log.forEach(entry => {
        table += `<tr><td>${entry.date}</td><td>${entry.weight}</td></tr>`;
    });
    table += "</table>";
    container.innerHTML = table;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
}
