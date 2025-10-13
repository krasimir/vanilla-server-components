import React, { Suspense } from "react";
import Posts from "./Posts.js";
async function AppSuspense() {
  return /* @__PURE__ */ React.createElement("html", null, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement("title", null, "Suspense"), /* @__PURE__ */ React.createElement("link", { rel: "stylesheet", href: "/styles.css" })), /* @__PURE__ */ React.createElement("body", null, /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement("h1", null, "Hello world"), /* @__PURE__ */ React.createElement(Suspense, { fallback: /* @__PURE__ */ React.createElement("h2", null, "Loading posts...") }, /* @__PURE__ */ React.createElement(Posts, null)))));
}
export {
  AppSuspense as default
};
