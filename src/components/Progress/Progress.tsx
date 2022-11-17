import { NUMBER_OF_STEPS } from "../Grid/Grid";

interface Props {
  step: number
}

export default function Progress({
  step
}: Props) {
  const stepPercent = step * 100 / NUMBER_OF_STEPS;

  return (
    <div className="progress">
      <div className="content">
        <div className="score">Score: {step}</div>
        <div 
          className="current"
          style={{
            width: `${stepPercent}%`
          }}
        ></div>
      </div>
    </div>
  )
}