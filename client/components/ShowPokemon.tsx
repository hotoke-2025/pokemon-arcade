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
      <h1 className="bg-transparent text-center text-2xl mt-5">
        A wild pokemon appeared!
        {/* {' '}
            {pokemon.name &&
              pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}{' '} */}
      </h1>
      <div className="pokemon-container">
        <div className="sprite-and-text">
          <img
            className="pokemonSprites"
            src={pokemon.sprites.front_default}
            alt={`Front Default Sprite for ${pokemon.name}`}
          />
        </div>
      </div>
      <div className="text-center">
        <h1 className="bg-transparent text-2xl m-5">Which pokemon is it?</h1>
        <input></input>
      </div>
    </>
  )
}
