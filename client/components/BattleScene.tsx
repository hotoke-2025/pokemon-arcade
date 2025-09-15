//battle
//damage
//const health boolean is alive or notAlive
// const isAlive = true
//notAlive= explosion, back to map on click

import { Link } from 'react-router'
import { fetchPokemonById } from '../apis/pokemon'
import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Explosion } from './Explosion.tsx'

export default function ShowPokemon() {
  const { monId } = useParams()
  const [showExplosion, setShowExplosion] = useState(false)

  // const [hiddenPokemon, setHiddenPokemon] = useState('')

  const {
    data: pokemon,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['pokemon', monId],
    queryFn: () => fetchPokemonById(Number(monId)),
  })

  if (isPending) {
    return <>Loading...</>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  console.log(pokemon.name)
  //run away

  return (
    <>
      <h1>
        A wild {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}{' '}
        has appeared...
      </h1>
      <div className="pokemon-container">
        <div className="sprite-and-text">
          <img
            // className="pokemonSprites"
            src={pokemon.sprites.front_default}
            alt={`Front Default Sprite for ${pokemon.name}`}
          />
        </div>
      </div>
      <div className="text-center">
        <h1>What will you do?</h1>
        <button id="fightBtn" onClick={() => setShowExplosion(true)}>
          {' '}
          Fight!{' '}
          {showExplosion && <Explosion />}
        </button>
        <button>
          <Link id="backBtn" to={'/game-1'}>
            {' '}
            Run Away{' '}
          </Link>
        </button>
      </div>
    </>
  )
}
