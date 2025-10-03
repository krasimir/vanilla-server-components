import React from "react";
import path from "path";
import { renderToPipeableStream } from "react-dom/server";
import http from "http";
import express from "express";
import { fileURLToPath } from "url";
import App from "./components/App.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = 8087;
const app = express();
const server = http.createServer(app);
app.use(express.static(path.join(__dirname, "..", "public")));
app.get("/", (req, res) => {
  const stream = renderToPipeableStream(/* @__PURE__ */ React.createElement(App, null), {
    bootstrapScripts: ["/bundle.js"],
    onShellReady() {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      stream.pipe(res);
    },
    onError(err) {
      console.error(err);
    }
  });
});
server.listen(port, () => {
  console.log(`App listening on port ${port}.`);
});
