import { MouseEvent, useEffect, useState } from "react";
import Progress from "../Progress/Progress";
import GridCard from "./GridCard";

type TCell = {
  index: number
}

export const NUMBER_OF_STEPS = 6;
export const TIMEOUT_MS = 1000;

export default function Grid() {
  const [grid, setGrid] = useState([
    [1, 2, 2, 4],
    [1, 3, 4, 5],
    [3, 5, 6, 6]
  ].flat());

  // board
  const [revealedGrid, setRevealedGrid] = useState<Array<boolean>>(new Array(grid.flat().length).fill(false));
  const [previousReveal, setPreviousReveal] = useState<TCell | undefined>();
  const [freezeBoard, setFreezeBoard] = useState(false);

  // progress
  const [step, setStep] = useState(0);

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

        if (step > 0) {
          setStep(prev => prev - 1);
        }

        setTimeout(() => {
          tempRevealGrid[index] = false;
          tempRevealGrid[previousReveal.index] = false;
          setRevealedGrid([...tempRevealGrid]);
          setFreezeBoard(false);
        }, TIMEOUT_MS);
      } else {
        setStep(prev => prev + 1)
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
    }, 1000);
  }

  useEffect(() => {
    handleWin();
  }, [revealedGrid])

  return (
    <div 
      className="game-grid"
      onMouseMove={handleMouseMove}
    >
      <>
        <Progress 
          step={step}
        />
        <h1>Memory Ed</h1>
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
      </>
    </div>
  )
}