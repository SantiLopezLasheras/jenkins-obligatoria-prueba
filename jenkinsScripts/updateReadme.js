import { readFile, writeFile } from "fs";
import { join } from "path";

console.log(`HOLA DESDE UPDATEREADME: ${process.argv[2]}`);

// Path del README
// eslint-disable-next-line no-undef
const readmePath = join(__dirname, "..", "README.md");

// URL del badge
const badgeSuccess =
  "https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg";
const badgeFailure =
  "https://img.shields.io/badge/tested%20with-Cypress-D32F2F.svg";

// Función para actualizar el README
const updateReadme = (status) => {
  // Lee el archivo README.md
  readFile(readmePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error leyendo el README.md:", err);
      process.exit(1);
    }

    // Elige el badge según el resultado de las pruebas
    const badge = status === "success" ? badgeSuccess : badgeFailure;

    // Regex para encontrar la línea donde se inserta el badge
    const badgeRegex =
      /!\[Test Status\]\(https:\/\/img\.shields\.io\/badge\/tested%20with-Cypress-.*\.svg\)/;

    // Si el badge existe, lo reemplazamos; si no, lo añadimos al principio
    if (badgeRegex.test(data)) {
      const updatedData = data.replace(badgeRegex, `![Test Status](${badge})`);
      writeUpdatedReadme(updatedData);
    } else {
      const updatedData = `![Test Status](${badge})\n\n` + data;
      writeUpdatedReadme(updatedData);
    }
  });
};

// Función para escribir el archivo README actualizado
const writeUpdatedReadme = (updatedData) => {
  writeFile(readmePath, updatedData, "utf8", (err) => {
    if (err) {
      console.error("Error escribiendo el README.md:", err);
      process.exit(1);
    }
    console.log("README.md actualizado con éxito!");
  });
};

// Obtener el estado de las pruebas como argumento (success o failure)
const status = process.argv[2];
if (!status || (status !== "success" && status !== "failure")) {
  console.error(
    'Por favor, proporciona un estado válido ("success" o "failure")'
  );
  process.exit(1);
}

// Llamar a la función para actualizar el README
updateReadme(status);
