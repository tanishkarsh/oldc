import { useState, useEffect } from "react";
import { Send, Mic, MicOff } from "lucide-react";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function InputBar({ onSend, loading }) {
  const [text, setText] = useState("");

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // ================= DEBUG =================

  useEffect(() => {
    console.log("Listening:", listening);
  }, [listening]);

  useEffect(() => {
    console.log("Transcript:", transcript);
  }, [transcript]);

  // =========================================

  /* ==========================================
     Update Textbox While Speaking
  ========================================== */

  useEffect(() => {
    setText(transcript);
  }, [transcript]);

  /* ==========================================
     Send Message
  ========================================== */

  function handleSubmit() {
    if (!text.trim()) return;

    onSend(text);

    setText("");

    resetTranscript();

    SpeechRecognition.stopListening();
  }

  /* ==========================================
     Enter Key Support
  ========================================== */

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  /* ==========================================
     Toggle Microphone
  ========================================== */

  function toggleMic() {
    if (!browserSupportsSpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();

      SpeechRecognition.startListening({
        continuous: true,
        language: "en-IN",
      });
    }
  }

  return (
    <div className="input-container">

      <textarea
        placeholder="Ask anything about DU SOL..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={2}
      />

      <button
        className={`mic-button ${listening ? "listening" : ""}`}
        onClick={toggleMic}
        disabled={loading}
        title={
          listening
            ? "Stop Listening"
            : "Start Voice Input"
        }
      >
        {listening ? (
          <MicOff size={20} />
        ) : (
          <Mic size={20} />
        )}
      </button>

      <button
        onClick={handleSubmit}
        disabled={loading}
        title="Send Message"
      >
        <Send size={20} />
      </button>

    </div>
  );
}