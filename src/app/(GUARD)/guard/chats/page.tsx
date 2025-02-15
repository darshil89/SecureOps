"use client";

import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { useSession } from "next-auth/react";

const socket = io("ws://localhost:5000", {
    transports: ["websocket"],
});

export default function GuardChat() {
    const session = useSession();
    const guardId = session.data?.user.id;
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
    const [message, setMessage] = useState("");
    const [userId, setUserId] = useState<string | null>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    console.log("GuardChat -> guardId", guardId);

    useEffect(() => {
        socket.on("connect", () => console.log("Connected to WebSocket"));

        // Listen for messages sent to the guard
        socket.on(`${guardId}-chat`, ({ sender, text, userId }) => {
            setMessages((prev) => [...prev, { sender, text }]);
            setUserId(userId); // Save userId for replying
        });

        return () => {
            socket.off(`${guardId}-chat`);
        };
    }, [guardId]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollLeft = chatContainerRef.current.scrollWidth;
        }
    }, [messages]);

    const sendMessage = () => {
        if (!message.trim() || !userId) return;

        const msg = { sender: "guard", text: message };
        socket.emit("sendMessage", { userId, guardId, message: msg });
        setMessages((prev) => [...prev, msg]);
        setMessage("");
    };

    return (
        <div className="flex flex-col w-full max-w-4xl mx-auto p-4 bg-gray-100">
            <h2 className="text-lg font-bold text-center mb-2">Security Guard Chat</h2>

            {/* Chat container (HORIZONTAL SCROLL) */}
            <div
                ref={chatContainerRef}
                className="flex overflow-x-auto whitespace-nowrap border bg-white rounded-md shadow p-2"
                style={{ height: "200px", maxWidth: "100%" }}
            >
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`p-2 m-2 rounded-lg w-fit max-w-sm ${msg.sender === "guard"
                                ? "bg-blue-500 text-white self-end"
                                : "bg-gray-300 text-black"
                            }`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>

            {/* Message input box */}
            <div className="flex mt-2">
                <input
                    type="text"
                    className="flex-1 p-2 border rounded"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button
                    onClick={sendMessage}
                    className="ml-2 bg-blue-500 text-white px-3 py-2 rounded"
                >
                    Send
                </button>
            </div>
        </div>
    );
}
