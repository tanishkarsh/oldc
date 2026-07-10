import { useState } from "react";
import "./styles/app.css";

import Navbar from "./components/Navbar";
import LeftPanel from "./components/LeftPanel";
import ChatCard from "./components/ChatCard";

function App() {

    const [selectedQuestion, setSelectedQuestion] = useState("");

    const handleQuestionSelect = (question) => {
        setSelectedQuestion(question);
    };

    return (

        <>

            <Navbar />

            <div className="main-container">

                <LeftPanel
                    onQuestionSelect={handleQuestionSelect}
                />

                <ChatCard
                    selectedQuestion={selectedQuestion}
                />

            </div>

        </>

    );

}

export default App;