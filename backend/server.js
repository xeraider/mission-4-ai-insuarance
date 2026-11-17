import express from "express";
import cors from "cors";
import { randomUUID } from "node:crypto";

import {
    startInterview,
    respondToInterview,
} from "../backend/";

const app = express();

app.use(cors());
app.use(express.json());

const sessions = new Map();

app.post("/api/insurance/start", (req, res) => {

});

app.post("/api/insurance/answer", (req, res) => {

});

app.post("/api/insurance/:sessionId", (req, res) => {

});

app.listen(3001, () => console.log("Server is running on port 3001"));

