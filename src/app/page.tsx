// src/app/page.tsx
'use client'; // Required for useState and useEffect

import { useState, useEffect } from 'react';

const phrases = [
  "Initiating sequence...",
  "Connecting to secure channel...",
  "Bypassing mainframe security...",
  "Access Granted.",
  "Welcome, Operator.",
  "[L0stSec_]",
];

const blinker = <span className="animate-ping absolute inline-flex h-3 w-1 ml-1 bg-hacker-green rounded-full opacity-75"></span>;
const staticBlinker = <span className="ml-1 text-hacker-green">|</span>;


export default function Home() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [showBlinker, setShowBlinker] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150); // Speed of typing

  useEffect(() => {
    const handleTyping = () => {
      const currentTargetPhrase = phrases[currentPhraseIndex];
      let newTypedText = '';

      if (isDeleting) {
        newTypedText = currentTargetPhrase.substring(0, typedText.length - 1);
        setTypingSpeed(75); // Faster when deleting
      } else {
        newTypedText = currentTargetPhrase.substring(0, typedText.length + 1);
        setTypingSpeed(150); // Normal typing speed
      }

      setTypedText(newTypedText);

      if (!isDeleting && newTypedText === currentTargetPhrase) {
        // Pause at end of phrase
        if (currentPhraseIndex === phrases.length - 1) {
          // Last phrase, stop animation, show persistent title
          // setShowBlinker(false); // Blinker logic is handled in the second useEffect
          return; // Stop the animation
        }
        setIsDeleting(true);
        setTypingSpeed(1000); // Pause before deleting
      } else if (isDeleting && newTypedText === '') {
        setIsDeleting(false);
        setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        setTypingSpeed(500); // Pause before typing next phrase
      }
    };

    // Only run if not on the last phrase or if the last phrase isn't fully typed yet
    if (!(currentPhraseIndex === phrases.length - 1 && typedText === phrases[phrases.length - 1])) {
      const timer = setTimeout(handleTyping, typingSpeed);
      return () => clearTimeout(timer);
    }
  }, [typedText, isDeleting, currentPhraseIndex, typingSpeed]);

  // Blinker effect for the cursor when the final phrase is displayed
  useEffect(() => {
    if (currentPhraseIndex === phrases.length - 1 && typedText === phrases[phrases.length - 1]) {
      // Last phrase fully typed, start blinking the staticBlinker
      const blinkTimer = setInterval(() => {
        setShowBlinker(b => !b);
      }, 500);
      return () => clearInterval(blinkTimer);
    } else {
      // During typing animation, use the underscore blinker (handled in JSX)
      // or ensure staticBlinker is not shown if that's the logic
      setShowBlinker(true); // Default to true for the typing phase's blinker
    }
  }, [currentPhraseIndex, typedText]);


  // Final display after animation
  if (currentPhraseIndex === phrases.length - 1 && typedText === phrases[phrases.length - 1]) {
    return (
      <div className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-150px)] py-10"> {/* Adjust min-h if needed */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-hacker-green drop-shadow-[0_0_10px_#00ff00]">
          {phrases[phrases.length - 1]}
          {showBlinker ? staticBlinker : ''}
        </h1>
        <div className="mt-8 space-y-3 text-lg sm:text-xl md:text-2xl text-hacker-green-dark">
          <p>&gt; Cybersecurity Researcher</p>
          <p>&gt; Bug Bounty Hunter</p>
          <p>&gt; Penetration Tester</p>
        </div>
        <div className="mt-10">
          <a
            href="/blog"
            className="px-6 py-3 border-2 border-hacker-green text-hacker-green hover:bg-hacker-green hover:text-hacker-dark font-semibold rounded-lg transition-all duration-300 ease-in-out shadow-[0_0_15px_rgba(0,255,0,0.5)] hover:shadow-[0_0_25px_rgba(0,255,0,0.8)]"
          >
            Explore My Work
          </a>
        </div>
      </div>
    );
  }

  // Typing animation display
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-150px)] py-10"> {/* Adjust min-h to account for nav/footer approx height */}
      <div className="font-mono text-2xl sm:text-3xl md:text-4xl text-hacker-green">
        <span>{typedText}</span>
        {/* This blinker is for the typing phase, Tailwind's animate-pulse for opacity */}
        <span className="animate-pulse">{currentPhraseIndex !== phrases.length -1 || typedText !== phrases[phrases.length -1] ? '_' : ''}</span>
      </div>
    </div>
  );
}
