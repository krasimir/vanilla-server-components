import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const httpStreaminClientCode = fs.readFileSync(path.join(__dirname, "client-code", "http-streamin.client.js"), "utf-8");
function getHTTPStreamingClientCode() {
  return httpStreaminClientCode;
}
export {
  getHTTPStreamingClientCode
};
