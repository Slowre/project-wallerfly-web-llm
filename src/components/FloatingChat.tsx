import { useState } from "react";
import { MessageCircle, X } from "lucide-react";



export default function FloatingChat() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([]);
    const [input, setInput] = useState("");


    const handleSend = () => {
        if (!input.trim() || '') return;

        const userMessage = { role: "user" as const, text: input };
        setMessages((prev) => [...prev, userMessage]);

       

        setInput("");
    };


    return (
        <>
            {/* Botón flotante */}
            <button
                onClick={() => setOpen(!open)}
                className="fixed bottom-6 right-6 bg-violet-600 text-white p-4 rounded-full shadow-xl hover:bg-violet-700 transition z-50"
            >
                {open ? <X size={24} /> : <MessageCircle size={24} />}
            </button>

            {/* Ventana del chat */}
            {open && (
                <div className="fixed bottom-20 right-6 w-80 h-96 bg-white dark:bg-gray-800 shadow-2xl rounded-2xl flex flex-col z-40">
                    <div className="p-3 bg-violet-600 dark:bg-pink-500 text-white font-bold rounded-t-2xl">
                        Mini Chat 
                    </div>

                    {/* Historial */}
                    <div className="flex-1 p-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200 space-y-2">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`p-2 rounded-lg max-w-[75%] ${msg.role === "user"
                                    ? "bg-violet-100 dark:bg-violet-700 self-end ml-auto"
                                    : "bg-gray-200 dark:bg-gray-700 self-start"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                       
                    </div>

                    {/* Input */}
                    <div className="p-2 border-t border-gray-200 dark:border-gray-700 flex gap-2">
                        <input
                            type="text"
                            placeholder="Escribe un mensaje..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-sm"
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                           
                        />
                        <button
                            onClick={handleSend}
                            className="bg-violet-600 text-white px-3 rounded-lg disabled:opacity-50"
                        >
                            Enviar
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
