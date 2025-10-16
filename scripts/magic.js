import fs from 'fs';
import swc from "@swc/core";
import path from 'path';
import { fileURLToPath } from "url";
import traverseNode from './utils/traverseNode.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC = path.join(__dirname, '..', 'src');
const wrapper = fs.readFileSync(path.join(__dirname, 'utils', 'wrapper.js'), 'utf8');

async function prepareForClient(file) {
  let code = fs.readFileSync(file, 'utf8');
  const { parse } = swc;
  const ast = await parse(code, {
    syntax: "typescript",
    tsx: true,
    decorators: false
  });

  // for debugging purposes
  fs.writeFileSync(path.join(SRC, "components", "AppWithClient.ast.json"), JSON.stringify(ast, null, 2));

  traverseNode(ast, {
    JSXOpeningElement(node) {
      if (node?.name?.value === "Comments") {
        node.name.value = "CommentsWrapper";
      }
    }
  });

  const transformed = await swc.print(ast, {
    minify: false
  });
  
  return transformed.code + '\n' + wrapper;
}

prepareForClient(path.join(SRC, 'components', 'AppWithClient.tsx')).then(newCode => {
  fs.writeFileSync(path.join(SRC, 'components', 'AppWithClient.rsc.tsx'), newCode);
})