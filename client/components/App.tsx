import { usePokemon } from '../hooks/usePokemon.ts'
import PlayerSprite from './PlayerSprite.tsx'
import { useEffect, useState } from 'react'


function App() {
  const { data } = usePokemon()

    const [position, setPosition] = useState({ x: 80, y: 140 })

  return (
    <>
      <div className="app">
        <h1 className="text-3xl font-bold underline">
          Fullstack Boilerplate - with Pokemon!
        </h1>
        <ul>
          {data && data.map((pokemon) => <li key={pokemon}>{pokemon}</li>)}
        </ul>
        <PlayerSprite position={position} setPosition={setPosition} />
      </div>
    </>
  )
}

export default App
