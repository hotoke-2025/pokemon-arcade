import img from '/images/player-sprite-standing-facing-towards.png'
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


// Code from coins-5000 - to edit and use when fetching data on the player in the backend:
// import { User } from '../../models/models'
// import { usePlayerSprite } from '../hooks/usePlayerSprite'

import { useEffect } from 'react'

function PlayerSprite ({ position, setPosition }: Props) {
  // Code from coins-5000 - to edit and use when fetching data on the player in the backend:
  // const player = usePlayerSprite()

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          setPosition((prev) => ({ ...prev, y: prev.y - 20 }))
          break
        case 'ArrowDown':
          setPosition((prev) => ({ ...prev, y: prev.y + 20 }))
          break
        case 'ArrowLeft':
          setPosition((prev) => ({ ...prev, x: prev.x - 20 }))
          break
        case 'ArrowRight':
          setPosition((prev) => ({ ...prev, x: prev.x + 20 }))
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
        src={img}
        style={{ width: '150px' }}
        id="player"
      ></img>
    </div>
  )
}

export default PlayerSprite
