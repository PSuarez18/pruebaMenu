import { useState, useEffect, useRef } from 'react';
import chefBot from "../assets/svg/chef-brand-icon.svg";
import iconBack from "../assets/svg/arrow-to-left.svg";
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { SENDER_CHEF, SENDER_USER, TITLE_CHATBOT } from '../utils/consts/consts';
import axiosInstace from '../utils/api/axiosInstance';
import { API_CHATBOT_SERVER } from '../utils/api/consts/chatbot';
import { Spinner } from '@nextui-org/react';

const Chatbot = ({ closeChatBot }) => {
    const [messages, setMessages] = useState([
        { text: "¡Hola! soy el asistente Virtual desarrollado por PAOLO para una demostracion orientado a un restaurant implementando modelos de IA, ¿En qué puedo ayudarte hoy?", sender: SENDER_CHEF }
    ]);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState("");
    const [viewportHeight, setViewportHeight] = useState(window.innerHeight); // Estado para la altura del viewport
    const messagesEndRef = useRef(null);

    const handleSend = async () => {
        if (input.trim()) {
            const userMessage = { text: input, sender: SENDER_USER };
            setMessages((prev) => [...prev, userMessage]);
            setInput("");
            setLoading(true);

            try {
                const response = await axiosInstace.post(API_CHATBOT_SERVER, {
                    message: input
                });
                const botMessage = { text: response.data.response, sender: SENDER_CHEF };
                setMessages((prev) => [...prev, botMessage]);

            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setViewportHeight(window.innerHeight); // Actualizar la altura cuando cambie el tamaño de la ventana
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="w-full fixed top-0 left-0 flex flex-col bg-white rounded-lg shadow-lg"
            style={{ height: viewportHeight }}> {/* Ajustar el alto dinámicamente */}
            <div className="bg-blackPrimary text-white p-9 flex justify-between items-center">
                <button onClick={closeChatBot}>
                    <img src={iconBack} alt="icon go back" />
                </button>
                <div className='w-max h-max gap-[0.65rem] flex items-center'>
                    <img src={chefBot} alt="icon brand Chef" />
                    <h2 className="text-base font-bold">{TITLE_CHATBOT}</h2>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                {messages.map((msg, index) => (
                    <ChatMessage sender={msg.sender} text={msg.text} key={index} />
                ))}

                {/* Mostrar el Spinner mientras se espera la respuesta del servidor */}
                {loading && (
                    <div className="flex justify-center items-center mt-4">
                        <Spinner
                            size="lg"
                            color='default'
                        />
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            <ChatInput
                inputValue={input}
                onInputChange={(e) => setInput(e.target.value)}
                onSend={handleSend}
            />
        </div>
    );
};

export default Chatbot;
