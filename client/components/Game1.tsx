// import { Link } from 'react-router'
// import MyAudioPlayer from './Audio.tsx'
import PlayerSprite from './PlayerSprite.tsx'
import { useState } from 'react'

// boundaries suss
// use abe's code (but without images) to specify points on screen (within boundaires) that trigger a console.log()
// change to randomly generated
// possibly resize step/sprite/background so that it conforms to grid 
// change console.log() to link to battle scene

// can run, which takes back to original screen (/game-1)
// can catch
// stretch - can battle

function Game1() {
  function getRandomMonId(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const monId = getRandomMonId(1, 1025)
  const [position, setPosition] = useState({ x: 80, y: 140 })

  return (
    <div>
      {/* <MyAudioPlayer /> */}
      <p>Move the sprite to search for Pokémon</p>

      <div className="poke-map">
        <PlayerSprite position={position} setPosition={setPosition} />
      </div>
    </div>
  )
}

export default Game1
