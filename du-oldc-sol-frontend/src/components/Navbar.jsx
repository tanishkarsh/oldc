import { useState, useEffect } from "react";
import "../styles/Navbar.css";

import logo from "../assets/logo.png";
import Modal from "./Modal";

import {
    Menu,
    Home,
    Building2,
    Bot,
    Database,
    Phone,
    Moon,
    Sun
} from "lucide-react";

export default function Navbar({

    sidebarOpen,
    setSidebarOpen

}) {

    const [darkMode, setDarkMode] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);

    const [modalTitle, setModalTitle] = useState("");

    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {

        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "dark") {

            document.body.classList.add("dark-theme");

            setDarkMode(true);

        }

    }, []);

    const toggleTheme = () => {

        if (darkMode) {

            document.body.classList.remove("dark-theme");

            localStorage.setItem("theme", "light");

        }

        else {

            document.body.classList.add("dark-theme");

            localStorage.setItem("theme", "dark");

        }

        setDarkMode(!darkMode);

    };

    const openModal = (title, content) => {

        setModalTitle(title);

        setModalContent(content);

        setModalOpen(true);

    };

    const goHome = () => {

        window.location.reload();

    };

    return (

        <>

            <nav className="navbar">

                <div className="navbar-left">

                    <button
                        className="menu-btn"
                        onClick={() => setSidebarOpen(true)}
                    >

                        <Menu size={24} />

                    </button>

                    <img
                        src={logo}
                        alt="logo"
                        className="logo"
                    />

                    <div>

                        <h2>DU SOL</h2>

                        <p>

                            School of Open Learning

                        </p>

                    </div>

                </div>

                <div className="navbar-links">

                    <button onClick={goHome}>

                        <Home size={18}/>

                        Home

                    </button>

                    <button
                        onClick={() =>
                            openModal(
                                "About DU SOL",
                                <>
                                    <p>
                                        School of Open Learning (SOL),
                                        University of Delhi,
                                        is one of India's leading
                                        institutions providing quality
                                        education through Open and
                                        Distance Learning.
                                    </p>

                                    <a
                                        href="https://sol.du.ac.in"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        https://sol.du.ac.in
                                    </a>

                                </>
                            )
                        }
                    >

                        <Building2 size={18}/>

                        About DU SOL

                    </button>

                    <button
                        onClick={() =>
                            openModal(
                                "About AI Assistant",
                                <>
                                    <p>

                                        This chatbot uses RAG with
                                        Groq and Qdrant Cloud.

                                    </p>
                                </>
                            )
                        }
                    >

                        <Bot size={18}/>

                        AI Assistant

                    </button>

                    <button
                        onClick={() =>
                            openModal(
                                "Data Sources",
                                <>
                                    <p>

                                        Information is retrieved
                                        from official DU SOL PDFs.

                                    </p>
                                </>
                            )
                        }
                    >

                        <Database size={18}/>

                        Data Sources

                    </button>

                    <button
                        onClick={() =>
                            openModal(
                                "Contact",
                                <>
                                    <p>info@sol.du.ac.in</p>
                                    <p>011-27008300</p>
                                </>
                            )
                        }
                    >

                        <Phone size={18}/>

                        Contact

                    </button>

                    <button onClick={toggleTheme}>

                        {

                            darkMode ?

                            <>

                                <Sun size={18}/>

                                Light

                            </>

                            :

                            <>

                                <Moon size={18}/>

                                Dark

                            </>

                        }

                    </button>

                </div>

            </nav>

            <Modal

                isOpen={modalOpen}

                onClose={() => setModalOpen(false)}

                title={modalTitle}

            >

                {modalContent}

            </Modal>

        </>

    );

}