import "../styles/LeftPanel.css";

import hero from "../assets/hero.png";

import {
  GraduationCap,
  BookOpen,
  CalendarDays,
  IndianRupee,
  FileText,
  Bell,
} from "lucide-react";

export default function LeftPanel({ onQuestionSelect }) {

  const cards = [
    {
      icon: <GraduationCap size={24} />,
      title: "Admissions",
      text: "Admission process, eligibility and important dates.",
      question: "Tell me about DU SOL admissions.",
    },
    {
      icon: <BookOpen size={24} />,
      title: "Courses",
      text: "UG, PG and Certificate programmes.",
      question: "What courses are offered by DU SOL?",
    },
    {
      icon: <CalendarDays size={24} />,
      title: "Exams",
      text: "Schedules, guidelines and results.",
      question: "Tell me about DU SOL examinations.",
    },
    {
      icon: <IndianRupee size={24} />,
      title: "Fees",
      text: "Fee structure and payment.",
      question: "What is the fee structure for DU SOL?",
    },
    {
      icon: <FileText size={24} />,
      title: "Study Material",
      text: "Books, notes and assignments.",
      question: "Where can I find DU SOL study material?",
    },
    {
      icon: <Bell size={24} />,
      title: "Notices",
      text: "Show me the latest DU SOL notices.",
    },
  ];

  return (
    <div className="left-panel">

      <h1>
        Welcome to
        <br />
        <span>DU SOL Assistant</span>
      </h1>

      <p className="subtitle">
        Your AI companion for all information related to
        <br />
        DU School of Open Learning.
      </p>

      <div className="feature-list">

        {cards.map((item, index) => (

          <div
            key={index}
            className="feature-card"
            onClick={() => onQuestionSelect(item.question)}
            style={{ cursor: "pointer" }}
          >

            <div className="feature-icon">

              {item.icon}

            </div>

            <div>

              <h3>{item.title}</h3>

              <p>{item.text}</p>

            </div>

          </div>

        ))}

      </div>

      <div className="bottom-section">

        <img
          src={hero}
          className="hero-image"
          alt="DU SOL Illustration"
        />

        <div className="contact">

          <p>🌐 www.sol.du.ac.in</p>

          <p>📞 2700 1102 02</p>

          <p>✉️ info@sol.du.ac.in</p>

        </div>

      </div>

    </div>
  );
}