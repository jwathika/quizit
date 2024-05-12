const QuizCard = ({ question, options }) => (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <h3 className="text-xl font-bold mb-2">{question}</h3>
        <ul className="list-disc list-inside">
            {options.map((option, idx) => (
                <li key={idx}>{option}</li>
            ))}
        </ul>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Next</button>
        <div className="mt-2 text-red-500 animate-pulse">{/* Blinking alert */}</div>
    </div>
);
export default QuizCard;