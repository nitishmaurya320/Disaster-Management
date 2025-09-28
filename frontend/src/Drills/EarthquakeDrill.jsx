import React, { useState, useEffect } from "react";

export default function EarthquakeDrill() {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [history, setHistory] = useState([]);
  const [isDrillActive, setIsDrillActive] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [message, setMessage] = useState("");
  const [endSummary, setEndSummary] = useState(null);
  const [timer, setTimer] = useState(0);
  const [difficulty, setDifficulty] = useState("medium"); // easy, medium, hard

  const difficultyTime = {
    easy: 15,
    medium: 10,
    hard: 5,
  };

  const questions = [
    {
      question: "During an earthquake indoors, what is safest?",
      options: [
        "Run outside immediately",
        "Take cover under sturdy furniture",
        "Stand near glass windows",
      ],
      answer: 1,
    },
    {
      question: "If you are outside during an earthquake?",
      options: [
        "Run inside a building",
        "Move away from buildings and power lines",
        "Lie down near a wall",
      ],
      answer: 1,
    },
    {
      question: "After the shaking stops, what should you do first?",
      options: [
        "Check yourself and others for injuries",
        "Use the elevator quickly",
        "Ignore and resume activities",
      ],
      answer: 0,
    },
  ];

  // 🔊 Narration
  const narrate = (text) => {
    if ("speechSynthesis" in window) {
      const msg = new SpeechSynthesisUtterance(text);
      msg.rate = 1;
      window.speechSynthesis.speak(msg);
    }
  };

  // 🔊 Quake sound
  const playQuakeSound = () => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(40, ctx.currentTime);
    gainNode.gain.setValueAtTime(0.5, ctx.currentTime);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    setTimeout(() => osc.stop(), 2000);
  };

  // 📳 Vibration
  const vibrate = () => {
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 400, 100, 600]);
    }
  };

  // 🎮 Start Drill
  const startDrill = (level = "medium") => {
    setScore(0);
    setHistory([]);
    setEndSummary(null);
    setDifficulty(level);
    setIsDrillActive(true);
    narrate("Earthquake drill started! Take cover immediately.");
    setMessage("Earthquake drill started! Take cover immediately.");
    simulateEarthquake();
  };

  // 🌍 Simulate Earthquake
  const simulateEarthquake = () => {
    setIsShaking(true);
    playQuakeSound();
    vibrate();

    setTimeout(() => {
      setIsShaking(false);
      narrate("Aftershock warning!");
      setMessage("⚠️ Aftershock warning!");
      randomAftershocks();
      askQuestion();
    }, 3000);
  };

  // 🔄 Aftershocks
  const randomAftershocks = () => {
    let count = 0;
    const interval = setInterval(() => {
      if (count >= 2) {
        clearInterval(interval);
        return;
      }
      setIsShaking(true);
      playQuakeSound();
      vibrate();
      setTimeout(() => setIsShaking(false), 1000);
      count++;
    }, 2500);
  };

  // ❓ Ask Question
  const askQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
    setTimer(difficultyTime[difficulty]); // ← Set timer according to difficulty
    narrate(questions[randomIndex].question);
    setMessage(`❓ ${questions[randomIndex].question}`);
  };

  // ⏱ Timer effect
  useEffect(() => {
    if (currentQuestion && timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (currentQuestion && timer === 0) {
      handleAnswer(-1); // Time's up, wrong answer
    }
  }, [timer, currentQuestion]);

  // ✅ Handle Answer
  const handleAnswer = (index) => {
    if (!currentQuestion) return;
    const isCorrect = index === currentQuestion.answer;
    if (isCorrect) {
      setScore((prev) => prev + 10);
      narrate("Correct action!");
      setMessage("✅ Correct action!");
    } else {
      narrate("That was unsafe! Be careful.");
      setMessage("❌ That was unsafe!");
    }

    setHistory((prev) => [
      ...prev,
      {
        q: currentQuestion.question,
        chosen: index === -1 ? "Time Up!" : currentQuestion.options[index],
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
      className={`flex flex-col p-3 items-center justify-center min-h-screen transition-colors ${
        isShaking ? "bg-red-100 animate-shake" : "bg-gray-100"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Earthquake Drill Simulator
      </h1>

      {!isDrillActive && !endSummary && (
        <div className="flex gap-4">
          <button
            onClick={() => startDrill("easy")}
            className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600"
          >
            Easy
          </button>
          <button
            onClick={() => startDrill("medium")}
            className="px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600"
          >
            Medium
          </button>
          <button
            onClick={() => startDrill("hard")}
            className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
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
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {currentQuestion.question}
          </h2>
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
          {timer > 0 && (
            <div className="mt-4 text-center text-xl font-bold text-red-600">
              Time Left: {timer}s
            </div>
          )}
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
            onClick={() => startDrill(difficulty)}
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
              <li
                key={idx}
                className="p-3 bg-white rounded-lg shadow flex flex-col"
              >
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
