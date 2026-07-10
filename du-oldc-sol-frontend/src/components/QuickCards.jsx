const cards = [
  "Admission",
  "Courses",
  "Exam Dates",
  "Fee Payment",
  "Study Material",
  "Results",
];

export default function QuickCards({ onSend }) {
  return (
    <div className="quick-cards">
      {cards.map((card) => (
        <button
          key={card}
          onClick={() => onSend(card)}
        >
          {card}
        </button>
      ))}
    </div>
  );
}