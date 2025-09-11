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
const spriteWidthNum: number = 22.5 // number, for clamping math
const spriteWidthCss: string = `${spriteWidthNum}px` // string, for CSS
const step: number = 20
interface Sprite {
  x: number
  y: number
}

interface Props {
  position: Sprite
  setPosition: React.Dispatch<React.SetStateAction<Sprite>>
}

import { useEffect, useState, useRef } from 'react'

// Use this when the player sprite changes appearance based on gender selection in the "user" table in the database
// import { User } from '../../models/models'
// import { usePlayerSprite } from '../hooks/usePlayerSprite'

function PlayerSprite({ position, setPosition }: Props) {
  // Use this when the player sprite changes appearance based on gender selection in the "user" table in the database
  // const player = usePlayerSprite()

  const [direction, setDirection] = useState<'up' | 'down' | 'left' | 'right'>(
    'down',
  )
    const containerRef = useRef<HTMLDivElement | null>(null)
    const [bounds, setBounds] = useState({ width: 0, height: 0 })


  useEffect(() => {
    const maxX = bounds.width - spriteWidthNum
    const maxY = bounds.width - spriteWidthNum
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent arrow keys from scrolling the page:
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault()
      }

        if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setBounds({ width: rect.width, height: rect.height })
    }

      // Use the arrow keys to adjust the sprite position:
      setPosition((prev) => {
        let newX = prev.x
        let newY = prev.y

        switch (e.key) {
          case 'ArrowUp':
            newY -= step
            setDirection('up')
            break
          case 'ArrowDown':
            newY += step
            setDirection('down')
            break
          case 'ArrowLeft':
            newX -= step
            setDirection('left')
            break
          case 'ArrowRight':
            newX += step
            setDirection('right')
            break
          default:
            break
        }

        // Clamp to screen boundaries
        return {
          x: Math.min(Math.max(newX, 0), maxX),
          y: Math.min(Math.max(newY, 0), maxY),
        }
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [setPosition])

  return (
    <div
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
      }}
    >
      <img
        alt="player"
        src={sprites[direction]}
        style={{ width: spriteWidthCss }}
        id="player"
      />
    </div>
  )
}

export default PlayerSprite
