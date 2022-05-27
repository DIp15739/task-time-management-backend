import { App } from "./app";

async function main() {
  const port = process.env.APP_LISTEN_PORT || 8080;
  const app = new App(port);
  await app.listen();
}

main();
