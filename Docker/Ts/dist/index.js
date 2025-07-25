"use strict";
// src/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const server_1 = __importDefault(require("./app/server"));
const PORT = process.env.PORT ? +process.env.PORT : 8000;
const server = http_1.default.createServer(server_1.default);
server.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
server.on("error", (error) => {
    console.error("❌ Server error:", error);
});
