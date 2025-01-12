import { promises as fs } from "fs";
import path from "path";

async function main() {
  const resultadoJest = process.argv[2];
  console.log(`HOLA DESDE UPDATEREADME: ${resultadoJest}`);

  try {
    const badge =
      resultadoJest === "success"
        ? "https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg"
        : "https://img.shields.io/badge/tested%20with-Cypress-D32F2F.svg";

    // Obtener la ruta al directorio del script
    const __dirname = path.dirname(new URL(import.meta.url).pathname);

    // Asegurémonos de que estamos accediendo correctamente al archivo OldREADME.md
    const ruta_OldREADME = path.join(__dirname, "..", "OldREADME.md");

    // Depuración: Verifica la ruta que se está construyendo
    console.log("Ruta de OldREADME.md:", ruta_OldREADME);

    // Verificar si el archivo OldREADME.md existe en la ruta esperada
    try {
      await fs.access(ruta_OldREADME);
      console.log("El archivo OldREADME.md existe");
    } catch (error) {
      console.log("El archivo OldREADME.md NO existe en la ruta especificada");
      process.exit(1); // Termina con error si el archivo no existe
    }

    // Leemos el archivo OldREADME.md
    const old_readme = await fs.readFile(ruta_OldREADME, "utf8");

    // Generar el nuevo contenido para README.md
    const new_readme = `<img src="${badge}" />` + "\n" + old_readme;

    // Escribir el nuevo contenido en README.md
    await fs.writeFile(path.join(__dirname, "..", "README.md"), new_readme);
    process.exit(0);
  } catch (error) {
    console.log("Error:", error);
    process.exit(1);
  }
}

main();
