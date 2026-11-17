import express from "express";
import cors from "cors";
import { randomUUID } from "node:crypto";

import {
    startInsurance,
    respondInsurance,
    checkConsent,
} from "./services/insuranceService.js";

const app = express();

app.use(cors());
app.use(express.json());

const sessions = new Map();

app.post("/api/insurance/start", async (req, res) => {

    const sessionId = randomUUID();
    const result = startInsurance();

    sessions.set(sessionId, {
        history: [
            {
                role: "tina",
                text: result.message,
            }
        ],
        optedIn: false,
        completed: false,
        busy: false
    });

    res.status(201).json({
        sessionId,
        ...result
    });
});

app.post("/api/insurance/respond", async (req, res) => {

    const {sessionId, answer} = req.body || {};

    const session = sessions.get(sessionId);

    if (!session) {
        return res.status(404).json({
            error: "No session found",
        });
    }

    if (session.busy){
        return res.status(409).json({
            error: "Session is busy",
        });
    }

    if (session.completed){
        return res.status(400).json({
            error: "Session is completed",
        });
    }

    if (
        typeof answer !== "string" ||
        !answer.trim()
    ) {
        return res.status(400).json({
            error: "Invalid answer.",
        })
    }

    const userAnswer = answer.trim();

    session.busy = true;

    try {

        if (!session.optedIn) {
            const consent = await checkConsent(userAnswer);

            if (consent === "declined") {
                session.completed = true;

                return res.json({
                    message: "No problem! Thank you for your time.",
                    completed: true,
                    recommendations: []
                });
            }

            if (consent === "unclear") {
                return res.json({
                    message: "Would you like to continue? Please answer yes or no.",
                    completed: false,
                    recommendations: []
                });
            }

            if (consent === "accepted") {
                session.optedIn = true;
            }
        }

        const updatedHistory = [ ...session.history,
            {
                role: "user",
                text: userAnswer,
            }
        ];

        const result = await respondInsurance(updatedHistory);

        if (
            !result ||
            typeof result.message !== "string" ||
            typeof result.completed !== "boolean" ||
            !Array.isArray(result.recommendations)
        ) {
            throw new Error("Invalid Response");
        }

        session.history = [ ...updatedHistory, {
                role: "tina",
                text: result.message,
            }
        ];

        session.completed = result.completed;

        res.json(result);

    }
    catch (error) {

        console.log(error);

        res.status(502).json({
            error: "Failed to generate response",
        })

    }
    finally {

        session.busy = false;

    }
});

app.delete("/api/insurance/:sessionId", async (req, res) => {

    const { sessionId } = req.params;

    const session = sessions.get(sessionId);

    if (!session) {
        return res.status(404).json({
            error: "Session not found"
        });
    }

    if (session.busy) {
        return res.status(409).json({
            error: "Session is busy"
        });
    }

    sessions.delete(sessionId);

    res.json({
        message: "Session deleted successfully"
    });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`);});

