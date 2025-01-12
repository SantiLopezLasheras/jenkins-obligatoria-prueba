import { execSync } from "child_process";

const vercelToken = process.argv[2];

const deployToVercel = (vercelToken) => {
  try {
    // Instalar la CLI de Vercel si no está instalada
    console.log("Installing Vercel CLI...");
    execSync("npm install -g vercel", { stdio: "inherit" });

    // Autenticarse con el token de Vercel
    console.log("Authenticating with Vercel...");
    execSync(`vercel login ${vercelToken}`, { stdio: "inherit" });

    // Hacer el despliegue en Vercel
    console.log("Deploying to production...");
    execSync(`vercel --prod --token ${vercelToken} --confirm`, {
      stdio: "inherit",
    });

    console.log("Deployment to Vercel completed successfully.");
  } catch (error) {
    console.error("Error during deployment to Vercel:", error);
    process.exit(1);
  }
};

deployToVercel(vercelToken);
