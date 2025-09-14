import PlayerSprite from './PlayerSprite.tsx'
import Mons from './WildMonsGenerator.tsx'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router"


// resize step/sprite/background so that it conforms to grid
// Clean code, add comments
// Pull request

function generateRandomMons(
  count: number,
  mapWidth: number,
  mapHeight: number,
) {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    monId: Math.floor(Math.random() * 1025) + 1, // random Pokémon id
    top: Math.floor(Math.random() * (mapHeight - 50)), // 50px padding so it doesn’t overflow
    left: Math.floor(Math.random() * (mapWidth - 50)),
  }))
}

function Game1() {
  const [position, setPosition] = useState({ x: 385, y: 240 })
  const [mons, setMons] = useState<Mon[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate() // for collision detection 

  // Generate random mon locations when map loads:
  useEffect(() => {
    if (containerRef.current) {
      const mapWidth = containerRef.current.offsetWidth
      const mapHeight = containerRef.current.offsetHeight
      const randomMons = generateRandomMons(20, mapWidth, mapHeight)
      setMons(randomMons)
    }
  }, [containerRef])

  useEffect(() => {
    mons.forEach((mon, i) => {
      if (
        position.x + 50 > mon.left &&
        position.x + 50 <= mon.left + 40 &&
        position.y + 50 > mon.top &&
        position.y + 50 <= mon.top + 40
      ) {
        // remove the mon
        const current = [...mons]
        current.splice(i, 1) // remove mon when caught
        setMons(current)

        // navigate to Battle Scene
        navigate(`/game-1/${mon.monId}`)
      }
    })
  }, [position, mons, navigate])

  return (
    <div>
      <p>Walk around to search for Pokémon!</p>

      <div className="poke-map" ref={containerRef}>
        <PlayerSprite
          position={position}
          setPosition={setPosition}
          containerRef={containerRef}
        />
        <Mons mons={mons} setMons={setMons} />
      </div>
    </div>
  )
}

export default Game1
