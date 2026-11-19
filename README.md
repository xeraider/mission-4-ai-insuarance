# Tina — AI Insurance Assistant

Tina is a conversational AI application that helps users explore suitable car insurance options. Instead of presenting a long form, Tina asks questions one at a time, adapts to the user's answers, and provides recommendations with explanations.

Built as a full-stack project using **React**, **Express**, and **Google Gemini**, with **Docker** and **Nginx** for local containerized deployment.

## Features

- Interactive chat interface with automatic scrolling
- Consent check before starting the insurance interview
- AI-generated follow-up questions based on conversation history
- Structured recommendations with explanations
- Validation of AI responses against the supported insurance products
- Start and stop controls for interview sessions
- Separate frontend and backend containers managed with Docker Compose

## Insurance products

Tina can recommend the following products based on the information provided:

- **Mechanical Breakdown Insurance** — not available for trucks or racing cars
- **Comprehensive Car Insurance** — only considered for vehicles less than 10 years old
- **Third Party Car Insurance**

Recommendations are informational and do not guarantee eligibility or coverage. Tina does not generate insurance prices or invent policy terms.

## Tech stack

| Layer | Technology |
| --- | --- |
| Frontend | React, Vite, JavaScript, CSS |
| Backend | Node.js, Express |
| AI | Google Gemini API (`@google/genai`) |
| Containerization | Docker, Docker Compose |
| Web server and proxy | Nginx |

## How it works

```text
User
  |
  v
React chat interface
  |
  v
Nginx (/api/ reverse proxy)
  |
  v
Express API
  |
  v
Google Gemini API
  |
  v
Structured response -> Express -> React
```

1. The user starts a chat and is asked for consent.
2. The backend classifies the consent response.
3. Once consent is given, Tina asks questions about the user's vehicle and insurance needs.
4. Express sends conversation history and insurance rules to Gemini.
5. The backend validates the structured JSON response before sending it to the frontend.
6. Tina displays the next question or the final recommendations.

Interview sessions are stored in backend memory, so they are cleared when the backend restarts.

## Getting started

### Prerequisites

- Docker Desktop with Docker Compose
- A Google Gemini API key

### Run with Docker

**1. Clone the repository**

```bash
git clone <YOUR_REPOSITORY_URL>
cd mission-4-ai-insuarance
```

**2. Configure your API key**

Create a file named `backend/.env`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

**Never commit your `.env` file or API key to GitHub.**

**3. Build and start the application**

```bash
docker compose up -d --build
```

**4. Open the application**

Visit **http://localhost:8080**.

**5. Stop the containers**

```bash
docker compose down
```

### Useful Docker commands

View backend logs:

```bash
docker compose logs -f backend
```

Rebuild after making changes:

```bash
docker compose up -d --build
```

## Project structure

```text
mission-4-ai-insuarance/
├── backend/
│   ├── services/
│   │   └── insuranceService.js   # Gemini prompts, schemas and validation
│   ├── server.js                 # Express routes and interview sessions
│   └── Dockerfile
├── src/
│   ├── components/               # ChatWindow, Navbar and Resources
│   ├── styles/                   # Component styling
│   ├── App.jsx
│   └── main.jsx
├── public/
├── compose.yaml                  # Frontend and backend services
├── Dockerfile                   # React build served by Nginx
├── nginx.conf                   # API reverse proxy
├── package.json
└── README.md
```

## API endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/insurance/start` | Start a new interview session |
| `POST` | `/api/insurance/respond` | Submit an answer and receive Tina's response |
| `DELETE` | `/api/insurance/:sessionId` | Delete an interview session |

## Limitations

- AI responses depend on Gemini API availability and quota.
- Sessions are stored in memory rather than a database.
- Recommendations are based on the limited product rules defined for this project, not a complete insurance underwriting system.
- The application is a learning project and is not intended to replace professional insurance advice.

## What I learned

This project provided practical experience in integrating a React frontend with an Express backend, designing prompts and structured AI responses, managing conversational state, handling API errors, and deploying a multi-container application using Docker and Nginx.

---

*Developed as part of the Mission Ready HQ full-stack development programme.*
