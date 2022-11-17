import { MouseEvent, useEffect, useState } from "react";
import GridCard from "./GridCard";

type TCell = {
  index: number
}

export default function Grid() {
  const [grid, setGrid] = useState([
    [1, 2, 2, 4],
    [1, 3, 4, 5],
    [3, 5, 6, 6]
  ].flat());

  const [revealedGrid, setRevealedGrid] = useState<Array<boolean>>(new Array(grid.flat().length).fill(false));
  const [previousReveal, setPreviousReveal] = useState<TCell | undefined>();
  const [freezeBoard, setFreezeBoard] = useState(false);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    for (let card of document.getElementsByClassName("card") as any) {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
  
      card.style.setProperty("--mouse-x", `${x}px`)
      card.style.setProperty("--mouse-y", `${y}px`)
    }
  }

  function handleReveal(index: number) {
    if (freezeBoard) return;
    if (revealedGrid[index]) return;

    const revealedCard = grid[index];
    const tempRevealGrid = [...revealedGrid];
    
    tempRevealGrid[index] = true;
    setRevealedGrid(tempRevealGrid);

    if (previousReveal) {
      const previousRevealedCard = grid[previousReveal.index];

      if (previousRevealedCard !== revealedCard) {
        setFreezeBoard(true);
        setTimeout(() => {
          tempRevealGrid[index] = false;
          tempRevealGrid[previousReveal.index] = false;
          setRevealedGrid([...tempRevealGrid]);
          setFreezeBoard(false);
        }, 1000);
      }
      setPreviousReveal(undefined)
    } else {
      setPreviousReveal({
        index: index
      })
    }
  }

  function handleWin() {
    const hasWon = revealedGrid.every(isRevealed => isRevealed);

    setTimeout(() => {
      if (hasWon) {
        alert("fdfgfd")
      }
    }, 1);
  }

  useEffect(() => {
    handleWin();
  }, [revealedGrid])

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
              value={index}
              card={card}
              isRevealed={revealedGrid[index]}
              handleReveal={handleReveal}
            />
          )
        })}
      </div>
    </div>
  )
}