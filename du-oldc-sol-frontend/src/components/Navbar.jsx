import { useState, useEffect } from "react";
import "./../styles/navbar.css";

import logo from "../assets/logo.png";
import Modal from "./Modal";

import {
    Home,
    Building2,
    Bot,
    Database,
    Phone,
    Moon,
    Sun
} from "lucide-react";

export default function Navbar() {

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
                                        University of Delhi, is one of
                                        India's leading institutions
                                        providing quality education
                                        through Open and Distance Learning.

                                    </p>

                                    <p>

                                        <strong>Official Website</strong>

                                        <br/>

                                        <a
                                            href="https://sol.du.ac.in"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            https://sol.du.ac.in
                                        </a>

                                    </p>

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

                                        This chatbot has been developed
                                        to assist DU SOL students using
                                        Retrieval-Augmented Generation (RAG).

                                    </p>

                                    <ul>

                                        <li>Groq API</li>

                                        <li>Qdrant Cloud Vector Database</li>

                                        <li>Sentence Transformers</li>

                                        <li>Official DU SOL PDFs</li>

                                        <li>Voice Input</li>

                                        <li>Voice Output</li>

                                    </ul>

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

                                        The chatbot retrieves information
                                        from official DU SOL documents.

                                    </p>

                                    <ul>

                                        <li>UG Prospectus 2025-26.pdf</li>

                                        <li>PG Prospectus 2025-26.pdf</li>

                                        <li>Admissions.pdf</li>

                                        <li>General FAQs.pdf</li>

                                    </ul>

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

                                    <p>

                                        <strong>Website</strong>

                                        <br/>

                                        <a
                                            href="https://sol.du.ac.in"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            https://sol.du.ac.in
                                        </a>

                                    </p>

                                    <p>

                                        <strong>Email</strong>

                                        <br/>

                                        info@sol.du.ac.in

                                    </p>

                                    <p>

                                        <strong>Phone</strong>

                                        <br/>

                                        011-27008300

                                    </p>

                                    <p>

                                        <strong>Address</strong>

                                        <br/>

                                        School of Open Learning,
                                        University of Delhi,
                                        Delhi – 110007

                                    </p>

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