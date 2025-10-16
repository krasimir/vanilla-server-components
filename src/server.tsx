import React from "react";
import path from "path";
import { PassThrough } from "node:stream";
import { renderToPipeableStream, renderToString } from "react-dom/server";
import http from "http";
import express from "express";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { getComments, getPosts, getContent } from "./services/DB.js";
import App from "./components/App.js";
import AppAsync from "./components/AppAsync.js";
import AppPipeable from "./components/AppPipeable.js";
import AppSuspense from "./components/AppSuspense.js";
import AppWithClient from "./components/AppWithClient.rsc.js";

const port = 8087;
const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, "..", "public")));

// ------------------------------------------------------ HTTP streaming
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
  res.write(`\n<script>renderPosts(${
    JSON.stringify(posts)
  });</script>\n`);

  const comments = await getComments(3);
  res.write(`\n<script>renderComments(${
    JSON.stringify(comments)
  });</script>\n`);
  res.end();
});

// ------------------------------------------------------ React renderToString

app.get("/react-rendertostring", async (req, res) => {
  const posts = await getPosts();
  const comments = await getComments();
  const content = getContent(posts, comments);
  const appString = renderToString(
    <App>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </App>
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

// ------------------------------------------------------ React renderToString with async component

app.get("/react-rendertostring-async-comp", async (req, res) => {
  const appString = renderToString(<AppAsync />);

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

// ------------------------------------------------------ React renderToPipeableStream

app.get("/react-pipeable-stream", async (req, res) => {
  const stream = renderToPipeableStream(<AppPipeable />, {
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

// ------------------------------------------------------ React Suspense with renderToPipeableStream

app.get("/react-suspense", async (req, res) => {
  const stream = renderToPipeableStream(<AppSuspense />, {
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

// ------------------------------------------------------ React Suspense with client component

app.get("/react-suspense-with-client", async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  const sendToClient = (code) => {
    res.write(`<script>${code}</script>`);
  };
  
  const Promises = {
    _promises: [],
    add(id, p) {
      this._promises.push({ id, p });
      p.then((data) => {
        sendToClient(`promiseResolved("${id}", ${JSON.stringify(data)});`);
        this._promises = this._promises.filter((item) => item.id !== id);
        maybeEnd();
      })
    },
    length() {
      return this._promises.length;
    }
  };

  const reactStream = new PassThrough();
  let reactEnded = false;
  reactStream.pipe(res, { end: false });
  reactStream.on("end", () => {
    reactEnded = true;
    maybeEnd();
  });
  
  const maybeEnd = () => {
    if (reactEnded && Promises.length() === 0) {
      res.end();
    }
  }
  const stream = renderToPipeableStream(<AppWithClient Promises={Promises}/>, {
    bootstrapScripts: ["/bundle.js"],
    onShellReady() {
      stream.pipe(reactStream);
    },
    onError(err) {
      console.error(err);
    }
  });
});

// ------------------------------------------------------ Old way (blocking)
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

// ------------------------------------------------------ 

server.listen(port, () => {
  console.log(`App listening on port ${port}.`);
});
