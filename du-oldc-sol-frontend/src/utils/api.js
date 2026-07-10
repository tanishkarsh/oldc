import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export async function sendMessage(message, sessionId) {
  try {
    const response = await axios.post(`${BASE_URL}/api/chat`, {
      message,
      session_id: sessionId,
    });

    return response.data.reply;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}