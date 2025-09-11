import spriteDown from '/images/player-sprite-standing-facing-towards.png'
import spriteUp from '/images/player-sprite-standing-facing-away.png'
import spriteLeft from '/images/player-sprite-standing-facing-left.png'
import spriteRight from '/images/player-sprite-standing-facing-right.png'
const sprites = {
  up: spriteUp,
  down: spriteDown,
  left: spriteLeft,
  right: spriteRight,
}
// SPRINT TO DOS:
// Add boundaries!!! (Might need to be done in Game1 component)
// Add the pngs for walking and add another state for isWalking based on key down / key up
// Resize all pngs to be exactly the same width with the sprite exactly centre (so that the sprite doesn't slowly diagnally move when spamming up left up left etc)
// Add the equivalent images for female player and change sprite images based on backend "user" data

// Define step and sprite sizes:
const spriteWidth = '22.5px'
const step = 20
interface Sprite {
  x: number
  y: number
}

interface Props {
  position: Sprite
  setPosition: (position: Sprite | ((prev: any) => any)) => React.Dispatch<
    React.SetStateAction<{
      x: number
      y: number
    }>
  >
}

import { useEffect, useState } from 'react'

// Use this when the player sprite changes appearance based on gender selection in the "user" table in the database
// import { User } from '../../models/models'
// import { usePlayerSprite } from '../hooks/usePlayerSprite'

function PlayerSprite({ position, setPosition }: Props) {
  // Use this when the player sprite changes appearance based on gender selection in the "user" table in the database
  // const player = usePlayerSprite()

  const [direction, setDirection] = useState<'up' | 'down' | 'left' | 'right'>(
    'down',
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent arrow keys from scrolling the page:
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault()
      }

      // Use the arrow keys to adjust the sprite position:
      switch (e.key) {
        case 'ArrowUp':
          setPosition((prev) => ({ ...prev, y: prev.y - step }))
          setDirection('up')
          break
        case 'ArrowDown':
          setPosition((prev) => ({ ...prev, y: prev.y + step }))
          setDirection('down')
          break
        case 'ArrowLeft':
          setPosition((prev) => ({ ...prev, x: prev.x - step }))
          setDirection('left')
          break
        case 'ArrowRight':
          setPosition((prev) => ({ ...prev, x: prev.x + step }))
          setDirection('right')
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
      }}
    >
      <img
        alt="img"
        src={sprites[direction]}
        style={{ width: spriteWidth }}
        id="player"
      ></img>
    </div>
  )
}

export default PlayerSprite
