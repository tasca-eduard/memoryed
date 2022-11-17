interface Props {
  card: number,
  value: number,
  isRevealed: boolean
  handleReveal: (index: number) => void
}

export default function GridCard({
  value,
  isRevealed,
  card,
  handleReveal
}: Props) {
  return (
    <>
      {isRevealed ? (
        <button 
          className="card"
        >
          <div className="content">
            {card}
          </div>
          <div className="border"></div>
        </button>
      ) : (
        <button 
          className="card"
          onClick={() => handleReveal(value)}
        >
          <div className="content">
          </div>
        <div className="border"></div>
        </button>
      )}

    </>
  )
}