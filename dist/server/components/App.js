import React from "react";
function App({ children }) {
  return /* @__PURE__ */ React.createElement("html", null, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement("title", null, "Server Components"), /* @__PURE__ */ React.createElement("link", { rel: "stylesheet", href: "/styles.css" })), /* @__PURE__ */ React.createElement("body", null, /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement("h1", null, "Hello world"), children)));
}
export {
  App as default
};
