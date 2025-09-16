import { useEffect, useState } from 'react'

// Standing 
import spriteDown from '/images/player-sprite-standing-facing-towards.png'
import spriteUp from '/images/player-sprite-standing-facing-away.png'
import spriteLeft from '/images/player-sprite-standing-facing-left.png'
import spriteRight from '/images/player-sprite-standing-facing-right.png'

// Walking 
import spriteDownLeft from '/images/player-down-walk1.png' 
import spriteDownRight from '/images/player-down-walk2.png' 
import spriteUpLeft from '/images/player-up-walk1.png'  
import spriteUpRight from '/images/player-up-walk2.png' 
import spriteLeftLeft from '/images/player-left-walk1.png'
import spriteLeftRight from '/images/player-left-walk2.png' 
import spriteRightLeft from '/images/player-right-walk1.png' 
import spriteRightRight from '/images/player-right-walk2.png' 

const sprites = {
  up: {
    stand: spriteUp,
    left: spriteUpLeft,
    right: spriteUpRight,
  },
  down: {
    stand: spriteDown,
    left: spriteDownLeft,
    right: spriteDownRight,
  },
  left: {
    stand: spriteLeft,
    left: spriteLeftLeft,
    right: spriteLeftRight,
  },
  right: {
    stand: spriteRight,
    left: spriteRightLeft,
    right: spriteRightRight,
  },
}


// SPRINT TO DOS:
// Add the equivalent images for female player and change sprite images based on backend "user" data

// Define step and sprite sizes:
const GRID_SIZE = 15
const spriteWidthNum: number = 22.5 // for clamping math
const spriteWidthCss: string = `${spriteWidthNum}px` // for CSS

interface Sprite {
  x: number
  y: number
}

interface Props {
  position: Sprite
  setPosition: React.Dispatch<React.SetStateAction<Sprite>>
  containerRef: React.RefObject<HTMLDivElement>
}

// Use this when the player sprite changes appearance based on gender selection in the "user" table in the database
// import { User } from '../../models/models'
// import { usePlayerSprite } from '../hooks/usePlayerSprite'

function PlayerSprite({ position, setPosition, containerRef }: Props) {
  const [direction, setDirection] = useState<'up' | 'down' | 'left' | 'right'>('down')
  const [isWalking, setIsWalking] = useState(false)
  const [activeKey, setActiveKey] = useState<string | null>(null)

  // Track which foot should step next (alternate each move)
  const [nextFoot, setNextFoot] = useState<'left' | 'right'>('right')

  // Current frame: 'stand' | 'left' | 'right'
  const [frame, setFrame] = useState<'stand' | 'left' | 'right'>('stand')

  // Moves one tile smoothly
  const movePlayer = (dx: number, dy: number, newDir: typeof direction) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const maxX = rect.width - spriteWidthNum
    const maxY = rect.height - spriteWidthNum

    const targetX = Math.min(Math.max(position.x + dx, 0), maxX)
    const targetY = Math.min(Math.max(position.y + dy, 0), maxY)

    setDirection(newDir)
    setIsWalking(true)

    const steps = GRID_SIZE / 3 // smoothness (3 substeps per grid tile)
    let i = 0

    // Step animation: stand → foot → stand
    setFrame(nextFoot) // start stepping with current foot

    const interval = setInterval(() => {
      i++
      setPosition((prev) => ({
        x: prev.x + dx / steps,
        y: prev.y + dy / steps,
      }))

      if (i === Math.floor(steps / 2)) {
        setFrame('stand') // back to standing mid-way
      }

      if (i >= steps) {
        clearInterval(interval)
        setIsWalking(false)
        setFrame('stand')
        // Alternate foot for next move
        setNextFoot((f) => (f === 'left' ? 'right' : 'left'))
      }
    }, 40) // 60ms per substep (~16fps)
  }

  // Handle keydown/keyup
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault()
        setActiveKey(e.key)
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === activeKey) {
        setActiveKey(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [activeKey])

  // Run continuous movement while holding a key
  useEffect(() => {
    if (!activeKey || isWalking) return

    switch (activeKey) {
      case 'ArrowUp':
        movePlayer(0, -GRID_SIZE, 'up')
        break
      case 'ArrowDown':
        movePlayer(0, GRID_SIZE, 'down')
        break
      case 'ArrowLeft':
        movePlayer(-GRID_SIZE, 0, 'left')
        break
      case 'ArrowRight':
        movePlayer(GRID_SIZE, 0, 'right')
        break
    }
  }, [activeKey, isWalking, position]) // reruns when done walking

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
        src={sprites[direction][frame]}
        style={{ width: spriteWidthCss }}
        id="player"
      />
    </div>
  )
}

export default PlayerSprite