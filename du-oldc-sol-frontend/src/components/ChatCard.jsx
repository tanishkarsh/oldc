import { useState, useRef, useEffect } from "react";
import "../styles/chatcard.css";
import InputBar from "./InputBar";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  Volume2,
  Square,
  Copy,
  Check,
} from "lucide-react";

import bot from "../assets/bot.png";

/* ============================
   Markdown Components
============================ */

const markdownComponents = {
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
};

/* ============================
   Format Message
============================ */

const formatMessage = (text) => {
  if (!text) return "";

  return text
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

/* ============================
   Format Time
============================ */

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/* ============================
   Voice Output
============================ */

function speakText(text) {

  if (!text) return;

  const speak = () => {

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    const speech = new SpeechSynthesisUtterance(text);

    const voices = window.speechSynthesis.getVoices();

    speech.voice =
      voices.find((v) => v.lang.startsWith("en")) ||
      voices[0];

    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;

    window.speechSynthesis.speak(speech);

  };

  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.onvoiceschanged = speak;
  } else {
    speak();
  }
}
export default function ChatCard({ selectedQuestion }) {

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text:
        "Hello! 👋\n\nI'm your DU SOL Assistant.\n\nHow can I help you today?",
      sources: [],
      time: new Date(),
    },
  ]);

  const [loading, setLoading] = useState(false);

  // Copy confirmation state
  const [copiedIndex, setCopiedIndex] = useState(null);

  const bottomRef = useRef(null);

  /* ============================
     Auto Scroll
  ============================ */

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  /* ============================
     Cleanup
  ============================ */

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  /* ============================
     Suggested Questions
  ============================ */

  useEffect(() => {
    if (!selectedQuestion) return;

    handleSend(selectedQuestion);
  }, [selectedQuestion]);

  /* ============================
     Send Message
  ============================ */

  async function handleSend(message) {

    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: message,
        time: new Date(),
      },
    ]);

    setLoading(true);

    try {

      const response = await fetch(
        "http://127.0.0.1:5000/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
            session_id: "default",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.reply,
          sources: data.sources || [],
          time: new Date(),
        },
      ]);

      // No automatic speech
      console.log("Bot response received.");

    } catch (err) {

      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Unable to connect to the server.",
          sources: [],
          time: new Date(),
        },
      ]);

    } finally {

      setLoading(false);

    }

  }
  return (

  <div className="chat-card">

    {/* ================= Header ================= */}

    <div className="chat-header">

      <div className="bot-info">

        <div className="bot-avatar">
          <img
            src={bot}
            alt="DU SOL Bot"
          />
        </div>

        <div>

          <h2>DU SOL Assistant</h2>

          <p>
            Official AI Assistant of DU School of Open Learning
          </p>

        </div>

      </div>

      <div className="online">
        🟢 Online
      </div>

    </div>

    {/* ================= Chat Body ================= */}

    <div className="chat-body">

      {messages.map((msg, index) => (

        <div
          key={index}
          className={
            msg.sender === "bot"
              ? "bot-message"
              : "user-message"
          }
        >

          {/* ================= Bot Avatar ================= */}

          {msg.sender === "bot" && (

            <div className="bot-avatar-small">

              <img
                src={bot}
                alt="Bot"
              />

            </div>

          )}

          {/* ================= Message ================= */}

          <div className="message">

            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {formatMessage(msg.text)}
            </ReactMarkdown>

            {/* ================= Action Buttons ================= */}

            {msg.sender === "bot" && (

              <div className="message-actions">

                {/* Listen */}

                <button
                  className="action-btn"
                  title="Listen"
                  onClick={() => speakText(msg.text)}
                >
                  <Volume2 size={18} />
                </button>

                {/* Stop */}

                <button
                  className="action-btn"
                  title="Stop"
                  onClick={() => window.speechSynthesis.cancel()}
                >
                  <Square size={18} />
                </button>

                {/* Copy */}

                <button
                  className="action-btn"
                  title="Copy"
                  onClick={() => {

                    navigator.clipboard.writeText(msg.text);

                    setCopiedIndex(index);

                    setTimeout(() => {

                      setCopiedIndex(null);

                    }, 1500);

                  }}
                >

                  {copiedIndex === index ? (

                    <Check size={18} />

                  ) : (

                    <Copy size={18} />

                  )}

                </button>

                {/* Copied Text */}

                {copiedIndex === index && (

                  <span className="copied-text">

                    ✓ Copied

                  </span>

                )}

              </div>

            )}

            {/* ================= Sources ================= */}

            {msg.sources &&
              msg.sources.length > 0 && (

                <div className="sources">

                  <strong>📄 Sources</strong>

                  <ul>

                    {msg.sources.map((source, index) => (

                      <li key={index}>
                        {source}
                      </li>

                    ))}

                  </ul>

                </div>

              )}

            {/* ================= Time ================= */}

            <div className="message-time">

              {formatTime(msg.time)}

            </div>

          </div>

        </div>

      ))}

      {/* ================= Typing Indicator ================= */}

      {loading && (

        <div className="bot-message">

          <div className="bot-avatar-small">

            <img
              src={bot}
              alt="Bot"
            />

          </div>

          <div className="message typing-message">

            <div className="typing">

              <span></span>
              <span></span>
              <span></span>

            </div>

          </div>

        </div>

      )}

      <div ref={bottomRef}></div>

    </div>

    {/* ================= Input ================= */}

    <InputBar
      onSend={handleSend}
      loading={loading}
    />

  </div>

);

}