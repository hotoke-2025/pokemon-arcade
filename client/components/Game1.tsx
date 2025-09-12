import PlayerSprite from './PlayerSprite.tsx'
import { useEffect, useRef, useState } from 'react'
import Mons from './WildMonsGenerator.tsx'

// boundaries suss
// use abe's code (but without images) to specify points on screen (within boundaires) that trigger a console.log()
// change to randomly generated
// possibly resize step/sprite/background so that it conforms to grid
// change console.log() to link to battle scene

// can run, which takes back to original screen (/game-1)
// can catch
// stretch - can battle



// Abe's mons code:
// const initalmons = [
//   { id: 1, top: 660, left: 1000, collected: false },
// ]

const initalMons = [
  { id: 1, top: 660, left: 1000 },
  { id: 2, top: 560, left: 500 },
  { id: 3, top: 340, left: 1100 },
  { id: 4, top: 740, left: 1300 },
  { id: 5, top: 140, left: 700 },
  { id: 6, top: 200, left: 1900 },
  { id: 7, top: 800, left: 600 },
  { id: 8, top: 300, left: 420 },
  { id: 9, top: 600, left: 1800 },
]


function Game1() {
  const [position, setPosition] = useState({ x: 80, y: 140 })
  const [mons, setMons] = useState({ initalMons })

  const containerRef = useRef<HTMLDivElement>(null)


   useEffect(() => {
    {
      mons.map((mon, i) => {
        if (
          position.x + 50 > mons[i].left &&
          position.x + 50 <= mons[i].left + 40 &&
          position.y + 50 > mons[i].top &&
          position.y + 50 <= mons[i].top + 40
        ) {
          const current = [...mons]
          current[i].collected = true
          setMons(current)
        }
      })
    }
  }, [position])


  return (
    <div>
      <p>Walk around to search for Pokémon!</p>

      <div className="poke-map" ref={containerRef}>
        <PlayerSprite
          position={position}
          setPosition={setPosition}
          containerRef={containerRef}
        />
        < Mons mons={mons} setMons={setMons}
          />
          {/* containerRef={containerRef} */}
        
      </div>
    </div>
  )
}

export default Game1
