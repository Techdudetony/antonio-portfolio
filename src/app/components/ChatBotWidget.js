"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function ChatBotWidget() {
    const [messages, setMessages] = useState([
        { from: "bot", text: "Hey! I'm TeJay! Ask me about my portfolio or where to go!" },
    ]);
    const [input, setInput] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const pathname = usePathname();
    const router = useRouter();

    const handleSend = async () => {
        const userMsg = input.trim();
        if (!userMsg) return;
        setMessages((prev) => [...prev, { from: "user", text: userMsg }]);
        setInput("");

        const res = await fetch("/api/chatbot", {
            method: "POST",
            body: JSON.stringify({
                message: `User is currently on ${pathname}. They said: "${userMsg}".`,
            }),
        });

        const data = await res.json();
        const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't understand that.";
        setMessages((prev) => [...prev, { from: "bot", text: reply }]);

        if (userMsg.toLowerCase().includes("resume")) router.push("/resume");
        if (userMsg.toLowerCase().includes("projects")) router.push("/projects");
    };

    return (
        <>
            {/* Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-4 right-4 z-50 bg-[#00ff00] text-black font-pixel px-4 py-2 border border-lime-600 rounded-full shadow-lg hover:bg-lime-300"
                >
                    Chat 💬
                </button>
            )}

            {/* Chat Box */}
            {isOpen && (
                <div className="fixed bottom-4 right-4 z-50 w-96 max-h-[30rem] bg-black border border-lime-500 rounded-xl font-pixel text-[#00ff00] flex flex-col shadow-2xl">
                    {/* Header with Avatar and Dismiss */}
                    <div className="flex justify-between items-center border-b border-lime-500 px-4 py-2 bg-black">
                        <div className="flex items-center gap-2">
                            <img
                                src="/pixel_avatar.png"
                                alt="TeJayBot Avatar"
                                className="w-6 h-6 rounded-sm border border-lime-500 animate-blink"
                            />
                            <span className="text-base">TeJayBot</span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-[#00ff00] hover:text-red-500 font-bold text-lg"
                        >
                            ×
                        </button>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 p-3 overflow-y-auto space-y-2">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={msg.from === "user" ? "text-right" : "text-left"}
                            >
                                <span className="text-sm">{msg.text}</span>
                            </div>
                        ))}
                    </div>

                    {/* Input Field */}
                    <div className="border-t border-lime-500 p-2 flex flex-col">
                        <textarea
                            rows={2}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            className="w-full resize-none bg-black px-2 py-1 text-[#00ff00] placeholder:text-gray-500 border border-lime-500 rounded font-pixel"
                            placeholder="Type here and press Enter..."
                        />
                        <button
                            onClick={handleSend}
                            className="mt-2 px-4 py-1 font-pixel bg-[#00ff00] text-black hover:bg-lime-300 transition border border-black rounded"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
