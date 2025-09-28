import React, { useState, useEffect } from "react";

export default function FloodDrill() {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [history, setHistory] = useState([]);
  const [isDrillActive, setIsDrillActive] = useState(false);
  const [isFlooding, setIsFlooding] = useState(false);
  const [message, setMessage] = useState("");
  const [endSummary, setEndSummary] = useState(null);
  const [timer, setTimer] = useState(0);
  const [difficulty, setDifficulty] = useState("easy");

  const questions = [
    {
      question: "Water is rising quickly, what should you do?",
      options: ["Move to higher ground", "Stay in basement", "Swim in flood water"],
      answer: 0,
    },
    {
      question: "During flood, should you drive through moving water?",
      options: ["Yes, if your car is big", "No, it’s dangerous", "Only if road looks shallow"],
      answer: 1,
    },
    {
      question: "After flood water recedes, what should you check first?",
      options: ["Gas leaks and electrical hazards", "Drink tap water immediately", "Play in the mud"],
      answer: 0,
    },
  ];

  const difficultyTime = { easy: 15, medium: 10, hard: 5 };

  // Timer effect
  useEffect(() => {
    if (currentQuestion && timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (currentQuestion && timer === 0) {
      handleAnswer(-1); // Time's up
    }
  }, [timer, currentQuestion]);

  const narrate = (text) => {
    if ("speechSynthesis" in window) {
      const msg = new SpeechSynthesisUtterance(text);
      msg.rate = 1;
      window.speechSynthesis.speak(msg);
    }
  };

  const playFloodSound = () => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(60, ctx.currentTime);
    gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    osc.start();
    setTimeout(() => osc.stop(), 2000);
  };

  const vibrate = () => {
    if (navigator.vibrate) navigator.vibrate([300, 200, 600, 200, 900]);
  };

  const startDrill = (level) => {
    setDifficulty(level);
    setScore(0);
    setHistory([]);
    setEndSummary(null);
    setIsDrillActive(true);
    narrate(`Flood drill started on ${level} difficulty!`);
    setMessage(`🌊 Flood drill started! Difficulty: ${level.toUpperCase()}`);
    simulateFlood();
  };

  const simulateFlood = () => {
    setIsFlooding(true);
    playFloodSound();
    vibrate();

    setTimeout(() => {
      setIsFlooding(false);
      narrate("Water surge incoming! Stay alert.");
      setMessage("⚠️ Water surge incoming!");
      randomSurges();
      askQuestion();
    }, 2000);
  };

  const randomSurges = () => {
    let count = 0;
    const interval = setInterval(() => {
      if (count >= 2) {
        clearInterval(interval);
        return;
      }
      setIsFlooding(true);
      playFloodSound();
      vibrate();
      setTimeout(() => setIsFlooding(false), 1200);
      count++;
    }, 2500);
  };

  const askQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
    setTimer(difficultyTime[difficulty]);
    narrate(questions[randomIndex].question);
    setMessage(`❓ ${questions[randomIndex].question}`);
  };

  const handleAnswer = (index) => {
    if (!currentQuestion) return;
    const isCorrect = index === currentQuestion.answer;
    if (isCorrect) {
      setScore((prev) => prev + 10);
      narrate("Correct action!");
      setMessage("✅ Correct action!");
    } else {
      narrate(index === -1 ? "Time's up! Unsafe action!" : "That was unsafe during flood!");
      setMessage(index === -1 ? "⏰ Time's up! ❌ Unsafe!" : "❌ That was unsafe!");
    }

    setHistory((prev) => [
      ...prev,
      {
        q: currentQuestion.question,
        chosen: index === -1 ? "No answer (Time Up)" : currentQuestion.options[index],
        correct: currentQuestion.options[currentQuestion.answer],
      },
    ]);

    setCurrentQuestion(null);

    if (history.length + 1 >= 3) {
      setEndSummary({
        score,
        total: (history.length + 1) * 10,
        mistakes: history.filter((h) => h.chosen !== h.correct).length,
      });
      setIsDrillActive(false);
    } else {
      setTimeout(askQuestion, 1500);
    }
  };

  return (
    <div
      className={`flex flex-col p-4 items-center justify-center min-h-screen transition-colors ${
        isFlooding ? "bg-blue-200 animate-shake" : "bg-gray-100"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Flood Drill Simulator</h1>

      {!isDrillActive && !endSummary && (
        <div className="space-x-4">
          <button
            onClick={() => startDrill("easy")}
            className="px-6 py-3 bg-green-600 text-white rounded-xl shadow hover:bg-green-700"
          >
            Easy
          </button>
          <button
            onClick={() => startDrill("medium")}
            className="px-6 py-3 bg-orange-600 text-white rounded-xl shadow hover:bg-orange-700"
          >
            Medium
          </button>
          <button
            onClick={() => startDrill("hard")}
            className="px-6 py-3 bg-red-600 text-white rounded-xl shadow hover:bg-red-700"
          >
            Hard
          </button>
        </div>
      )}

      {message && (
        <div className="mt-4 p-4 bg-yellow-100 text-gray-800 rounded-xl shadow max-w-lg text-center">
          {message}
        </div>
      )}

      {isDrillActive && currentQuestion && (
        <div className="mt-6 p-6 bg-white rounded-2xl shadow-lg max-w-xl w-full">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">{currentQuestion.question}</h2>
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className="w-full px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-gray-800"
              >
                {option}
              </button>
            ))}
          </div>
          <div className="mt-4 text-center text-xl font-bold text-red-600">Time Left: {timer}s</div>
        </div>
      )}

      {endSummary && (
        <div className="mt-6 p-6 bg-green-100 rounded-2xl shadow-lg max-w-xl w-full">
          <h2 className="text-xl font-bold text-gray-800 mb-3">Drill Summary</h2>
          <p className="mb-1">
            Score: {endSummary.score} / {endSummary.total}
          </p>
          <p className="mb-1">Mistakes: {endSummary.mistakes}</p>
          <button
            onClick={() => setIsDrillActive(false)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
          >
            Restart Drill
          </button>
        </div>
      )}

      {history.length > 0 && (
        <div className="mt-8 w-full max-w-2xl">
          <h3 className="text-lg font-bold mb-3 text-gray-800">Drill History</h3>
          <ul className="space-y-2">
            {history.map((h, idx) => (
              <li key={idx} className="p-3 bg-white rounded-lg shadow flex flex-col">
                <span className="font-semibold">{h.q}</span>
                <span className="text-sm text-gray-600">
                  You chose: <b>{h.chosen}</b>
                </span>
                <span className="text-sm text-green-600">
                  Correct: <b>{h.correct}</b>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
