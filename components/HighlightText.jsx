// components/HighlightText.jsx
"use client";
import { useState, useEffect } from "react";

export default function HighlightText({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseTime = 2000
}) {
  const [textIndex, setTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const current = texts[textIndex];

      if (!isDeleting) {
        // Typing
        if (currentText.length < current.length) {
          setCurrentText(current.substring(0, currentText.length + 1));
        } else {
          // Pause at full text
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(current.substring(0, currentText.length - 1));
        } else {
          // Move to next text
          setIsDeleting(false);
          setTextIndex((textIndex + 1) % texts.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className="relative">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-bold">
        {currentText}
      </span>
      <span className="inline-block w-[2px] h-6 ml-1 bg-cyan-400 animate-pulse align-middle"></span>
    </span>
  );
}
