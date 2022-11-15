import { MouseEvent } from "react"

interface Props {
  value: number
}

export default function GridCard({
  value
}: Props) {
  return (
    <button className="card">
      <div className="content">
        {value}
      </div>
      <div className="border"></div>
    </button>
  )
}