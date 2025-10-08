import React, { useEffect, useState } from "react"
import { TiStarFullOutline, TiStarHalfOutline, TiStarOutline } from "react-icons/ti"

function RatingStars({ Review_Count = 0, Star_Size = 20 }) {
  const [starCount, setStarCount] = useState({ full: 0, half: 0, empty: 0 })

  useEffect(() => {
    const fullStars = Math.floor(Review_Count)
    const hasHalfStar = Review_Count % 1 !== 0 ? 1 : 0
    const emptyStars = 5 - fullStars - hasHalfStar

    setStarCount({
      full: fullStars,
      half: hasHalfStar,
      empty: emptyStars,
    })
  }, [Review_Count])

  return (
    <div className="flex items-center gap-1">
      {/* Full Stars */}
      {Array.from({ length: starCount.full }).map((_, i) => (
        <TiStarFullOutline
          key={`full-${i}`}
          size={Star_Size}
          className="text-yellow-400"
        />
      ))}

      {/* Half Star */}
      {starCount.half === 1 && (
        <TiStarHalfOutline
          size={Star_Size}
          className="text-yellow-400"
        />
      )}

      {/* Empty Stars */}
      {Array.from({ length: starCount.empty }).map((_, i) => (
        <TiStarOutline
          key={`empty-${i}`}
          size={Star_Size}
          className="text-yellow-400"
        />
      ))}
    </div>
  )
}

export default RatingStars
