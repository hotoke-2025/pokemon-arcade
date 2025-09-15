import { Link } from 'react-router'
import { fetchPokemonById } from '../apis/pokemon'
import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import confetti from 'canvas-confetti'

export default function CaughtPokemon() {
  const { monId } = useParams()
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

  if (pokemon) {
  confetti({
    particleCount: 70,
    spread: 100,
    origin: { y: 0.6 },
    colors: ['#a864fd', '#29cdff', '#78ff44', '#ee73c4', '#fdff6a'],
  })
}

  return (
     <>
      <h1 className="bg-transparent text-center text-2xl mt-5">
  Gotcha!{' '}
  <span className="font-bold italic">
    {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
  </span>{' '}
  was caught!
</h1>
<br></br>
<button
  onClick={() => {
    const monId = Math.floor(Math.random() * 1025) + 1
    window.location.href = `/game-2/${monId}`
  }}
  className="keepPlayingButton"
>
  Keep Playing
</button>
      <div className="caughtSprite">
        <img
        className='h-3vw'
          src={pokemon.sprites.front_default}
          alt={`Front Default Sprite for ${pokemon.name}`}
        />
      </div>
    </>
  )
}