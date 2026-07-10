import { useState, useRef } from "react";
import { v4 as uuid } from "uuid";
import { sendMessage } from "../utils/api";

export default function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sessionId = useRef(uuid());

  async function send(text) {
    if (!text.trim()) return;

    const userMessage = {
      id: uuid(),
      role: "user",
      text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const reply = await sendMessage(text, sessionId.current);

      const botMessage = {
        id: uuid(),
        role: "bot",
        text: reply,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: uuid(),
          role: "bot",
          text: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function clear() {
    setMessages([]);
  }

  return {
    messages,
    loading,
    send,
    clear,
  };
}