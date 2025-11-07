"use client";
import { motion } from "framer-motion";
import { useRef } from "react";

export default function Burger({
  burger,
  onFlip,
}: {
  burger: any;
  onFlip: (id: number) => void;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleClick = () => {
    // Play sound effect on every click
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    onFlip(burger.id);
  };

  return (
    <>
      <motion.div
        initial={{
          left: `${burger.startX}%`,
          top: `${burger.startY}%`,
          opacity: 0,
          scale: 0.5,
          rotate: 0,
        }}
        animate={{
          left: `${burger.endX}%`,
          top: `${burger.endY}%`,
          opacity: burger.flipped ? 0.3 : 1,
          scale: burger.flipped ? 0.8 : 1,
          rotate: burger.flipped ? -15 : 0,
        }}
        exit={{
          scale: 0,
          rotate: 360,
          opacity: 0,
          transition: {
            duration: 0.4,
            ease: "easeInOut",
          },
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        onClick={handleClick}
        className="absolute cursor-pointer -translate-x-1/2 -translate-y-1/2"
        style={{ 
          pointerEvents: burger.flipped ? "none" : "auto"
        }}
      >
        {/* Burning glow effect when flipped */}
        {burger.flipped && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 0.3, repeat: Infinity }}
            className="absolute inset-0 blur-md bg-orange-600 rounded-full"
            style={{ transform: "scale(1.3)" }}
          />
        )}
        
        <img
          src="/burger.png"
          alt="burger"
          className={`w-16 h-16 transition-all relative z-10 ${
            burger.flipped 
              ? "grayscale brightness-[0.3] contrast-200 drop-shadow-[0_0_8px_rgba(255,100,0,0.8)]" 
              : burger.burnt
              ? "grayscale brightness-[0.3] contrast-200"
              : "hover:scale-110"
          }`}
          draggable={false}
        />
      </motion.div>
      
      {/* Hidden audio element */}
      <audio ref={audioRef} preload="auto">
        <source src="/flip-sound.mp3" type="audio/mpeg" />
      </audio>
    </>
  );
}
