import React from "react";
import path from "path";
import { renderToPipeableStream, renderToString } from "react-dom/server";
import http from "http";
import express from "express";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import App from "./components/App.js";
import AppAsync from "./components/AppAsync.js";
import AppPipeable from "./components/AppPipeable.js";
import { getComments, getPosts, getContent } from "./services/DB.js";
import AppSuspense from "./components/AppSuspense.js";
const port = 8087;
const app = express();
const server = http.createServer(app);
app.use(express.static(path.join(__dirname, "..", "public")));
app.get("/http-streaming", async (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Transfer-Encoding", "chunked");
  res.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>HTTP streaming</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <main>
          <h1>My blog</h1>
          <div id="posts">Loading posts...</div>
        </main>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `);
  const posts = await getPosts(3);
  res.write(`
<script>renderPosts(${JSON.stringify(posts)});</script>
`);
  const comments = await getComments(3);
  res.write(`
<script>renderComments(${JSON.stringify(comments)});</script>
`);
  res.end();
});
app.get("/react-rendertostring", async (req, res) => {
  const posts = await getPosts();
  const comments = await getComments();
  const content = getContent(posts, comments);
  const appString = renderToString(
    /* @__PURE__ */ React.createElement(App, null, /* @__PURE__ */ React.createElement("div", { dangerouslySetInnerHTML: { __html: content } }))
  );
  res.setHeader("Content-Type", "text/html");
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>renderToString</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <div id="root">${appString}</div>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `);
});
app.get("/react-rendertostring-async-comp", async (req, res) => {
  const appString = renderToString(/* @__PURE__ */ React.createElement(AppAsync, null));
  res.setHeader("Content-Type", "text/html");
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>renderToString with async component</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <div id="root">${appString}</div>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `);
});
app.get("/react-pipeable-stream", async (req, res) => {
  const stream = renderToPipeableStream(/* @__PURE__ */ React.createElement(AppPipeable, null), {
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
app.get("/react-pipeable-stream", async (req, res) => {
  const stream = renderToPipeableStream(/* @__PURE__ */ React.createElement(AppSuspense, null), {
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
app.get("/", async (req, res) => {
  const posts = await getPosts();
  const comments = await getComments();
  const content = getContent(posts, comments);
  res.setHeader("Content-Type", "text/html");
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Old way</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <h1>My blog</h1>
        ${content}
        <script src="/bundle.js"></script>
      </body>
    </html>
  `);
});
server.listen(port, () => {
  console.log(`App listening on port ${port}.`);
});
