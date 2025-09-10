import { Link } from 'react-router'
import { fetchPokemonById } from '../apis/pokemon'
import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
// import { useState } from 'react'

export default function ShowPokemon() {
  const { monId } = useParams()

  // const [hiddenPokemon, setHiddenPokemon] = useState('')

  //  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setHiddenPokemon(e.target.value)
  // }

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
        You found a wild pokemon!
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
        <input
          type="text"
          placeholder="Pikachu"
          name="pokemon"
          // value={hiddenPokemon}
          // onChange={handleInputChange}
        ></input>
        <br/>
        <button className='m-5 p-1 bg-white rounded-xl'>
          {/* {if(hiddenPokemon == ){
            <Link to={'/'}>
            Submit
            </Link>
          }} */}
        </button>
      </div>
    </>
  )
}
