import {useRef, useState} from "react";
import '../styles/ChatWindow.css'

const API_URL = "http://localhost:3001/api/insurance";

const ChatWindow = () => {

    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [error, setError] = useState("");

    const started = useRef(false);
    const sending = useRef(false);

    const startChat = async () => {

        if (loading || (session && !session.completed)){
            return;
        }

        setLoading(true);
        setError("");

        try{
            const response = await fetch(`${API_URL}/start`, {
                method: "POST"
            });

            if (!response.ok) {
                throw new Error("Failed to start chat");
            }

            const data = await response.json();

            setSession({
                id: data.sessionId,
                completed: data.completed,
            });

            setMessages([
                {
                    role: "tina",
                    text: data.message,
                }
            ]);

        } catch(error){
            setError(error.message);
        } finally {
            setLoading(false);
        }

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !userInput.trim() ||
            !session ||
            session.completed || loading
            )
        {
            return;
        }

        const answer = userInput.trim();

        setLoading(true);
        setError("");

        setMessages((prevMessages) => [
            ...prevMessages,
            {
                role: "user",
                text: answer,
            },
        ]);

        setUserInput("");

        try {

            const response = await fetch(`${API_URL}/respond`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sessionId: session.id,
                    answer,
                })
            });

            if (!response.ok) {
                throw new Error("Failed to get response");
            }

            const data = await response.json();

            let tinaMessage = data.message;

            if (data.recommendations?.length > 0) {
                data.recommendations.forEach((recommendation) => {
                    tinaMessage += `\n\n${recommendation.product}: ${recommendation.reason}`;
                });
            }

            setMessages((prev) => [
                ...prev,
                {
                    role: "tina",
                    text: tinaMessage
                }
            ]);

            setSession((prev) => ({
                ...prev,
                completed: data.completed
            }));

        } catch(error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const stopChat = async () => {
        if (!session || loading) return;

        setLoading(true);
        setError("");

        try {
            const response = await fetch(
                `${API_URL}/${session.id}`,
                { method: "DELETE" }
            );

            if (!response.ok) {
                throw new Error("Failed to stop chat");
            }

            setSession(null);
            setMessages([]);
            setUserInput("");

        } catch (error) {
            setError(error.message);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chat-container">

            <div className="chat-header">

                <h1>Tina</h1>

                <p> AI Insuarance Assistant</p>

            </div>

            <div className="chat-messages">

                {messages.map((message, index) => (

                    <div key={index} className={`chat-message ${message.role}`}>

                        <p>{message.text}</p>

                    </div>

                ))}

                {loading && <p>Loading...</p>}

            </div>

            {error && <p className="chat-error">{error}</p>}

            {!session && (
                <button className="chat-start" onClick={startChat} disabled={loading}>
                    Start Chat
                </button>
            )}

            {session && (
                <form className="chat-form" onSubmit={handleSubmit}>

                    <input type="text" placeholder="Enter Message..." value={userInput}
                           onChange={(e) =>
                            setUserInput(e.target.value)
                        }
                        disabled={loading || session.completed}
                    />

                    <button type="submit" disabled={loading || session.completed}>
                        Submit
                    </button>

                    <button type="button" onClick={stopChat} disabled={loading}>
                        Stop
                    </button>

                </form>
            )}

            {session?.completed && (
                <p>Conversation completed.</p>
            )}

        </div>
    )

}

export default ChatWindow
