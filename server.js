// import pkg from "./library/header"
const express = require("express");
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const client = new Client({
  puppeteer: {
    headless: true,
    args: [ "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-dev-shm-usage",
    "--disable-accelerated-2d-canvas",
    "--no-first-run",
    "--no-zygote",
    "--single-process", // <- this one doesn't works in Windows
    "--disable-gpu",],

  },
  authStrategy: new LocalAuth({
    clientId: "client-one",
  }),
});

client.initialize();

client.on("authenticated", (session) => {
  console.log("WHATSAPP WEB => Authenticated");
});



client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", async () => {
  console.log("WhatsApp is ready");
});

client.on("message", async (message) => {
 
  
});


const port = process.env.PORT || 8000;
app.listen(port, function () {
  console.log("App is running on*:" + port);
});
