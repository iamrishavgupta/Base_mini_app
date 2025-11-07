"use client";


import React from "react";


export default function Button({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
return (
<button
onClick={onClick}
className="px-5 py-3 bg-orange-500 text-white rounded-xl font-semibold shadow hover:scale-[1.02] active:scale-95 transition-transform"
>
{children}
</button>
);
}