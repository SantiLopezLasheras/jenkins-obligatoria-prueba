import { execSync } from "child_process";

// Obtenemos el executor y el motivo como parámetros de la pipeline
const executor = process.argv[2];
const motiu = process.argv[3];

// Cambiar al directorio raíz del repositorio
execSync('git config --global user.name "SantiLopezLasheras"');
execSync('git config --global user.email "sanloplas@alu.edu.gva.es"');

// Añadir cambios en el archivo README
execSync("git add README.md");

// Hacer commit con el mensaje solicitado
const commitMessage = `Pipeline executada per ${executor}. Motiu: ${motiu}`;
execSync(`git commit -m "${commitMessage}"`);

// Hacer push de los cambios al repositorio
execSync("git push origin main"); // Asegúrate de que 'main' es la rama correcta

console.log("README actualizado y cambios enviados al repositorio");
