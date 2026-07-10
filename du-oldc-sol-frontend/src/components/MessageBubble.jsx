export default function MessageBubble({ message }) {
  const isBot = message.role === "bot";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isBot ? "flex-start" : "flex-end",
        marginBottom: "12px",
      }}
    >
      <div
        style={{
          background: isBot ? "#ececec" : "#4f46e5",
          color: isBot ? "#000" : "#fff",
          padding: "12px",
          borderRadius: "12px",
          maxWidth: "70%",
        }}
      >
        {message.text}
      </div>
    </div>
  );
}