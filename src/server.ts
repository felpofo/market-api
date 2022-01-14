import "dotenv/config";

import http from "http";

import { app } from "./app";
import { success } from "./utils";

const PORT = process.env.SERVER_PORT ?? 4000;

const server = http.createServer(app);

server.listen(PORT, () => success(`Api started on port ${PORT}`));
