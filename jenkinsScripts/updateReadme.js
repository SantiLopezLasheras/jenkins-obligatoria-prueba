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

    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const ruta_OldREADME = path.join(__dirname, "..", "OldREADME.md");
    const old_readme = await fs.readFile(ruta_OldREADME, "utf8");
    const new_readme = `<img src="${badge}" />` + "\n" + old_readme;

    await fs.writeFile("./README.md", new_readme);
    process.exit(0);
  } catch (error) {
    console.log(error);
  }
}

main();
