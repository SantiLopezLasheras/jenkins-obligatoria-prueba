import { execSync } from "child_process";

const vercelToken = process.argv[2];

const deployToVercel = (vercelToken) => {
  try {
    // Usando CLI de Vercel
    execSync("npm install -g vercel", { stdio: "inherit" });

    // Autenticarse con el token de Vercel
    execSync(`vercel login ${vercelToken}`, { stdio: "inherit" });

    // Deploy en Vercel
    execSync(`vercel --prod --token ${vercelToken} --yes`, {
      stdio: "inherit",
    });

    console.log("Aplicación desplegada correctamente en Vercel.");
  } catch (err) {
    console.log("No se ha podido desplegar en Vercel:", err);
    process.exit(1);
  }
};

deployToVercel(vercelToken);
