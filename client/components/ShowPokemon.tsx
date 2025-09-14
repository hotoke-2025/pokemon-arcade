import { Link, useNavigate } from 'react-router'
import { fetchPokemonById } from '../apis/pokemon'
import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export default function ShowPokemon() {
  const { monId } = useParams()
  const navigate = useNavigate()
  const [hiddenPokemon, setHiddenPokemon] = useState('')

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
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHiddenPokemon(e.target.value)
  }

  const handleSubmit = () => {
    if (hiddenPokemon.toUpperCase() == pokemon.name.toUpperCase()) {
      navigate(`/game-2/caughtpokemon/${monId}`)
    } else {
      navigate(`/game-2/uncaughtpokemon/${monId}`)
    }
  }
  console.log(pokemon.name)
  return (
    <>
      <h1 className="bg-transparent text-center text-2xl mt-5">
        A wild Pokémon has appeared...
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
        <h1 className="bg-transparent text-2xl m-5">Quick! Guess correctly to catch it! </h1>
        <input
          className="text-center rounded-2xl p-1"
          type="text"
          placeholder="eg. Pikachu"
          name="pokemon"
          value={hiddenPokemon}
          onChange={handleInputChange}
        ></input>
        <br/>
        <button 
          onClick={handleSubmit}
          className='m-5 p-1 bg-white rounded-xl'>
            Submit
        </button>
      </div>
    </>
  )
}
