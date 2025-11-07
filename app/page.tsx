"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { sdk } from "@farcaster/miniapp-sdk"; // ← ADDED
import Burger from "./components/Burger";
import ScoreBoard from "./components/ScoreBoard";
import GameOver from "./components/GameOver";
import Button from "./components/ui/Button";

type BurgerType = {
  id: number;
  createdAt: number;
  flipped: boolean;
  burnt: boolean;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

export default function Page() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [burgers, setBurgers] = useState<BurgerType[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const burgerId = useRef(0);
  const spawnInterval = useRef<NodeJS.Timeout | null>(null);

  // ← ADDED: Initialize Base SDK
  useEffect(() => {
    const initSDK = async () => {
      try {
        await sdk.actions.ready();
        console.log("Base Mini App SDK initialized!");
      } catch (error) {
        console.error("SDK initialization error:", error);
      }
    };

    initSDK();
  }, []);

  // ← ADDED: Load high score on startup
  useEffect(() => {
    const saved = localStorage.getItem("burgerFlipHighScore");
    if (saved) setHighScore(Number(saved));
  }, []);

  // ← ADDED: Save high score when game ends
  useEffect(() => {
    if (gameOver && score > highScore) {
      setHighScore(score);
      localStorage.setItem("burgerFlipHighScore", score.toString());
    }
  }, [gameOver, score, highScore]);

  // FIXED: Random position generator
  const randomPosition = () => {
    const margin = 10;
    return {
      x: margin + Math.random() * (100 - 2 * margin),
      y: margin + Math.random() * (100 - 2 * margin),
    };
  };

  const randomEdge = () => {
    const edge = Math.floor(Math.random() * 4);
    let startX = 0,
      startY = 0;

    switch (edge) {
      case 0: // TOP
        startX = Math.random() * 100;
        startY = -10;
        break;
      case 1: // BOTTOM
        startX = Math.random() * 100;
        startY = 110;
        break;
      case 2: // LEFT
        startX = -10;
        startY = Math.random() * 100;
        break;
      case 3: // RIGHT
        startX = 110;
        startY = Math.random() * 100;
        break;
    }

    const margin = 15;
    const endX = margin + Math.random() * (100 - 2 * margin);
    const endY = margin + Math.random() * (100 - 2 * margin);

    return { startX, startY, endX, endY };
  };

  // 🎮 Spawn burgers
  const spawnBurger = () => {
    burgerId.current++;
    const { startX, startY, endX, endY } = randomEdge();

    setBurgers((prev) => [
      ...prev,
      {
        id: burgerId.current,
        createdAt: Date.now(),
        flipped: false,
        burnt: false,
        startX,
        startY,
        endX,
        endY,
      },
    ]);
  };

  // Spawn loop (custom speed progression based on score)
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    let rate;

    if (score < 100) {
      rate = 2000; // 2 seconds
    } else if (score < 200) {
      rate = 1500; // 1.5 seconds
    } else if (score < 300) {
      rate = 1000; // 1 second
    } else if (score < 400) {
      rate = 700; // 0.7 seconds
    } else if (score < 500) {
      rate = 600; // 0.6 seconds
    } else {
      rate = 400; // 0.4 seconds (max speed)
    }

    spawnBurger();
    spawnInterval.current = setInterval(spawnBurger, rate);

    return () => {
      if (spawnInterval.current) clearInterval(spawnInterval.current);
    };
  }, [gameStarted, gameOver, score]);

  // 🔥 Burn logic
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const burnInterval = setInterval(() => {
      setBurgers((prev) => {
        const updated = prev.map((b) => {
          const alive = Date.now() - b.createdAt;
          if (!b.flipped && !b.burnt && alive > 2000) {
            setLives((l) => {
              const newLives = Math.max(0, l - 1);
              if (newLives <= 0) {
                setTimeout(() => {
                  setGameOver(true);
                  setGameStarted(false);
                }, 0);
              }
              return newLives;
            });
            return { ...b, burnt: true };
          }
          return b;
        });
        return updated.filter((b) => Date.now() - b.createdAt < 2500);
      });
    }, 200);

    return () => clearInterval(burnInterval);
  }, [gameStarted, gameOver]);

  // 🍔 Flip burger → remove & respawn
  const handleFlip = (id: number) => {
    setBurgers((prev) =>
      prev.map((b) => (b.id === id ? { ...b, flipped: true } : b))
    );
    setScore((s) => s + 10);

    // Remove after animation completes
    setTimeout(() => {
      setBurgers((prev) => prev.filter((b) => b.id !== id));
    }, 400);
  };

  // 🔁 Restart
  const handleRestart = () => {
    setScore(0);
    setLives(3);
    setBurgers([]);
    burgerId.current = 0;
    setGameOver(false);
    setGameStarted(true);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-b from-orange-200 to-yellow-100 p-4 select-none">
      {!gameStarted && !gameOver && (
        <div className="text-center mt-20 space-y-4">
          <h1 className="text-4xl font-extrabold text-brown-900">
            🍔 Burger Flip!
          </h1>
          <p className="text-lg text-gray-700 font-medium">
            Tap burgers before they burn!
          </p>
          {/* ← ADDED: Show high score */}
          {highScore > 0 && (
            <p className="text-lg font-bold text-orange-600">
              High Score: {highScore}
            </p>
          )}
          <Button onClick={handleRestart}>Start Game</Button>
        </div>
      )}

      {gameStarted && !gameOver && (
        <>
          <ScoreBoard score={score} lives={lives} />
          {/* ← ADDED: Show best score during game */}
          <div className="text-m text-gray-600 mt-2">
            Best: {highScore}
          </div>
          <div className="relative w-full max-w-sm h-[520px] bg-yellow-50 rounded-2xl shadow-inner overflow-hidden mt-16 border border-orange-300">
            <AnimatePresence>
              {burgers.map((burger) => (
                <Burger key={burger.id} burger={burger} onFlip={handleFlip} />
              ))}
            </AnimatePresence>
          </div>
        </>
      )}

      {gameOver && (
        <div className="mt-24">
          <GameOver score={score} onRestart={handleRestart} />
        </div>
      )}

      <footer className="mt-8 text-base text-gray-800 font-extrabold tracking-wide">
        Built with ❤️ RISHAV
      </footer>
    </div>
  );
}
