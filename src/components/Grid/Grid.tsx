import { MouseEvent, useEffect, useState } from "react";
import GridCard from "./GridCard";

export default function Grid() {
  const [grid, setGrid] = useState([
    [1, 2, 2, 4],
    [1, 3, 4, 5],
    [3, 5, 6, 6]
  ].flat());

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    for (let card of document.getElementsByClassName("card") as any) {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
  
      card.style.setProperty("--mouse-x", `${x}px`)
      card.style.setProperty("--mouse-y", `${y}px`)
    }
  }

  return (
    <div 
      className="game-grid"
      onMouseMove={handleMouseMove}
    >
      <div className="wrapper">
        {grid.map((card, index) => {
          return (
            <GridCard
              key={index}
              value={card}
            />
          )
        })}
      </div>
    </div>
  )
}