import MessageBubble from "./MessageBubble";

export default function ChatWindow({ messages }) {

return (

<div className="chat-window">

{messages.length===0 && (

<div
style={{
textAlign:"center",
marginTop:"120px",
color:"#777"
}}
>

<h2>Welcome 👋</h2>

<p>

Ask me anything about DU SOL

</p>

</div>

)}

{messages.map((message)=>(

<MessageBubble

key={message.id}

message={message}

/>

))}

</div>

);

}