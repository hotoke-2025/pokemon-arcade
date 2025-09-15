import { Link } from 'react-router'
import { fetchPokemonById } from '../apis/pokemon'
import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'


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
  className="bg-white border border-black rounded-full px-4 py-2 text-sm mx-auto block w-fit"
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