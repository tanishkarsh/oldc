import { useState } from "react";
import "./styles/app.css";
import "./styles/Responsive.css";

import Navbar from "./components/Navbar";
import LeftPanel from "./components/LeftPanel";
import ChatCard from "./components/ChatCard";

function App() {

    const [selectedQuestion, setSelectedQuestion] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleQuestionSelect = (question) => {

        setSelectedQuestion(question);

        // Close sidebar after selecting a question
        setSidebarOpen(false);

    };

    return (

        <>

            <Navbar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {/* Dark overlay */}

            {sidebarOpen && (

                <div
                    className="overlay"
                    onClick={() => setSidebarOpen(false)}
                ></div>

            )}

            <div className="main-container">

                <LeftPanel
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
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