import express from "express";
import cors from "cors";
import { randomUUID } from "crypto";

import {
    startInterview,
    respondToInterview,
} from "../backend/";

const app = express();

app.use(cors());
app.use(express.json());

const sessions = new Map();

app.post("/api/interview/start", (req, res) => {

});

app.post("/api/interview/answer", (req, res) => {

});

app.post("/api/interview/:sessionId", (req, res) => {

});

app.listen(3001, () => console.log("Server is running on port 3001"));

