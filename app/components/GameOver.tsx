"use client";


import Button from "./ui/Button";


export default function GameOver({ score, onRestart }: { score: number; onRestart: () => void }) {
return (
<div className="text-center space-y-4 p-6 bg-white/80 rounded-2xl shadow max-w-sm mx-auto">
<h2 className="text-3xl font-bold text-red-600">Game Over</h2>
<p className="text-lg">Final Score: {score}</p>
<div className="flex justify-center">
<Button onClick={onRestart}>Play Again</Button>
</div>
</div>
);
}