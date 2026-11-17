import { useState } from "react";
import '../styles/ChatWindow.css'

const ChatWindow = () => {

    const [messages, setMessages] = useState([
        {
            role: "tina",
            text: "Hi! I'm Tina, your AI insurance assistant. May I ask you a few questions to find the right insurance policy for you?",
        }
    ]);

    const [userInput, setUserInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!userInput.trim()) {
            return;
        }

        const newMessage = {
            role: "user",
            text: userInput.trim(),
        }

        setMessages((prevMessages) => [
            ...prevMessages,
            newMessage
        ]);

        setUserInput("");
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

            </div>

            <form className="chat-form" onSubmit={handleSubmit}>

                <input type="text" placeholder="Enter Message..." value={userInput}

                    onChange={(e) =>

                        setUserInput(e.target.value)

                    }
                />

                <button type="submit">

                    Submit

                </button>

            </form>

        </div>
    )

}
export default ChatWindow
