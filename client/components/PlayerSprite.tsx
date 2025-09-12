import { useEffect, useState } from 'react'

import spriteDown from '/images/player-sprite-standing-facing-towards.png'
import spriteUp from '/images/player-sprite-standing-facing-away.png'
import spriteLeft from '/images/player-sprite-standing-facing-left.png'
import spriteRight from '/images/player-sprite-standing-facing-right.png'

// SPRINT TO DOS:
// Add the pngs for walking and add another state for isWalking based on key down / key up
// Resize all pngs to be exactly the same width with the sprite exactly centre (so that the sprite doesn't slowly diagnally move when spamming up left up left etc)
// Add the equivalent images for female player and change sprite images based on backend "user" data

// Match directions to the corresponding sprite image

const sprites = {
  up: spriteUp,
  down: spriteDown,
  left: spriteLeft,
  right: spriteRight,
}

// Sprite and step size dimensions

const spriteWidthNum: number = 22.5 // for clamping math
const spriteWidthCss: string = `${spriteWidthNum}px` // for CSS
const step: number = 20

// Sprite coordinate types
interface Sprite {
  x: number
  y: number
}

// Props passed from Game1.tsx
interface Props {
  position: Sprite
  setPosition: React.Dispatch<React.SetStateAction<Sprite>>
  containerRef: React.RefObject<HTMLDivElement>
}

// Use this when the player sprite changes appearance based on gender selection in the "user" table in the database
// import { User } from '../../models/models'
// import { usePlayerSprite } from '../hooks/usePlayerSprite'

// Main sprite component 

function PlayerSprite({ position, setPosition, containerRef }: Props) {
    // Use this next line when the player sprite changes appearance based on gender selection in the "user" table in the database
  // const player = usePlayerSprite()

  const [direction, setDirection] = useState<'up' | 'down' | 'left' | 'right'>('down')

  // Handle keyboard input and sprite movement

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault()
      }
      
      // Get map dimensions for boundary 

      const container = containerRef.current
 
      // If container hasn't loaded, return nothing (to prevent errors) Annie and Aeron to check with facilitator at some point

      if (!container) return

      // Fun fact rect is short for rectangle not rectum

      const rect = container.getBoundingClientRect() // every rectangle is a love rectangle when you love rectangles
      const maxX = rect.width - spriteWidthNum
      const maxY = rect.height - spriteWidthNum

      // Change sprite position based on keyboard input
      // Adjust position and update direction sprite is facing

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
        }

        // BOUNDARY SETTING

        return {
          x: Math.min(Math.max(newX, 0), maxX),
          y: Math.min(Math.max(newY, 0), maxY),
        }
      })
    }

    // Listening for key presses

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [containerRef, setPosition])

  // Renders sprite at current position 
  
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