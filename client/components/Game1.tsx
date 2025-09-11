import PlayerSprite from './PlayerSprite.tsx'
import { useRef, useState } from 'react'

// boundaries suss
// use abe's code (but without images) to specify points on screen (within boundaires) that trigger a console.log()
// change to randomly generated
// possibly resize step/sprite/background so that it conforms to grid
// change console.log() to link to battle scene

// can run, which takes back to original screen (/game-1)
// can catch
// stretch - can battle

function Game1() {
  const [position, setPosition] = useState({ x: 80, y: 140 })
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div>
      <p>Walk around to search for Pokémon!</p>

      <div className="poke-map" ref={containerRef}>
        <PlayerSprite
          position={position}
          setPosition={setPosition}
          containerRef={containerRef}
        />
      </div>
    </div>
  )
}

export default Game1
