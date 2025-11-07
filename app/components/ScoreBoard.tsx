"use client";


export default function ScoreBoard({ score, lives }: { score: number; lives: number }) {
return (
<div className="fixed top-4 left-0 right-0 flex justify-between px-6 text-lg font-semibold max-w-sm mx-auto">
<div className="rounded-full px-3 py-1 bg-white/60 backdrop-blur-sm shadow">Score: {score}</div>
<div className="rounded-full px-3 py-1 bg-white/60 backdrop-blur-sm shadow">❤️ {lives}</div>
</div>
);
}