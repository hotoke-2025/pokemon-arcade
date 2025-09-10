import { Link } from 'react-router'
import { fetchPokemonById } from '../apis/pokemon'
import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'

export default function ShowPokemon() {
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

  console.log(pokemon)
  return (
    <>
      <div>
        <button>
          <Link id="backBtn" to={'/'}>
            ← Home
          </Link>
        </button>
      </div>
      <div className="pokemon-container">
        <div className="sprite-and-text">
          <h1>
            A wild{' '}
            {pokemon.name &&
              pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}{' '}
            appeared!
          </h1>

          <img
            className=""
            src={pokemon.sprites.front_default}
            alt={`Front Default Sprite for ${pokemon.name}`}
          />
        </div>
      </div>
    </>
  )
}
  


