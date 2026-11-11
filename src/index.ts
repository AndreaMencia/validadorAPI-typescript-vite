import './styles.css';
import logo from './assets/logo.png';

function greet(name: string): void {
    const heading = document.createElement('h1');
    heading.textContent = `Hello, ${name}!`;
    document.body.appendChild(heading);

    const img = document.createElement('img');
    img.src = logo;
    img.alt = 'Project Logo';
    img.style.width = '200px';

    document.body.appendChild(img);
}

greet('TypeScript + Vite');

// --- Código del Validador de API (Tarea) ---
type Student = {
    id: number;
    name: string;
    scores: number[];
};

function safeParse(json: string): unknown {
    try {
        return JSON.parse(json);
    } catch (error) {
        return null;
    }
}

function isStudent(x: unknown): x is Student {
    if (typeof x !== 'object' || x === null) return false;
    const obj = x as Record<string, unknown>;
    return (
        'id' in obj &&
        typeof obj.id === 'number' &&
        'name' in obj &&
        typeof obj.name === 'string' &&
        'scores' in obj &&
        Array.isArray(obj.scores) &&
        (obj.scores as unknown[]).every((score) => typeof score === 'number')
    );
}

function average(nums: number[]): number {
    if (nums.length === 0) return 0;
    return nums.reduce((acc, curr) => acc + curr, 0) / nums.length;
}

function renderApp(): void {
    const jsonInput = '{"id":1,"name":"Hermione","scores":[95, 100, 98]}';
    const parsedData = safeParse(jsonInput);
    const appContainer = document.getElementById('app') || document.body;

    appContainer.innerHTML = '';

    const img = document.createElement('img');
    img.src = logo;
    img.alt = 'Logo';
    img.style.width = '150px';
    appContainer.appendChild(img);

    if (isStudent(parsedData)) {
        const avgScore = average(parsedData.scores);

        const heading = document.createElement('h1');
        heading.textContent = `Estudiante: ${parsedData.name}`;

        const paragraph = document.createElement('p');
        paragraph.textContent = `Promedio de calificaciones: ${avgScore.toFixed(2)}`;

        appContainer.appendChild(heading);
        appContainer.appendChild(paragraph);
    } else {
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Error: Estructura inválida.';
        errorMessage.style.color = 'red';
        appContainer.appendChild(errorMessage);
    }
}

renderApp();