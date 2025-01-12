import { execSync } from "child_process";

// Obtenemos el executor y el motivo como parámetros de la pipeline
const executor = process.argv[2];
const motivo = process.argv[3];

// Cambiar al directorio raíz del repositorio
execSync('git config --global user.name "SantiLopezLasheras"');
execSync('git config --global user.email "sanloplas@alu.edu.gva.es"');

// Aseguramos que las ramas remotas estén actualizadas
execSync("git fetch origin");

// Verificamos si estamos en la rama correcta (main) y cambiamos si es necesario
try {
  execSync("git checkout main");
  console.log("Cambiado a la rama main");
} catch (e) {
  console.log("Ya estamos en la rama main: " + e);
}

// Añadir cambios en el archivo README
execSync("git add README.md");

// Hacer commit con el mensaje solicitado
const commitMessage = `Pipeline executada per ${executor}. Motiu: ${motivo}`;
execSync(`git commit -m "${commitMessage}"`);

// Hacer push de los cambios al repositorio
execSync("git push origin main"); // Asegúrate de que 'main' es la rama correcta

console.log("README actualizado y cambios enviados al repositorio");
