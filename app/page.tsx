"use client"

import MengersCube from "@/components/MengersCube";


export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-rose-950">
      <div id="canvas-container" className="h-screen w-screen">
        <MengersCube/>
      </div>
    </div>
  );
}
