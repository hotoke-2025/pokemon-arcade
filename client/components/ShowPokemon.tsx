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
    <br></br>
      <img
  src="/images/AppearedText.png"
  alt="A wild Pokémon has appeared!"
  className="appearedText"
/>
      <div className="pokemon-container">
        <div className="sprite-and-text">
          <img
            className="pokemonSprites"
            src={pokemon.sprites.front_default}
            alt={`Front Default Sprite for ${pokemon.name}`}
          />
        </div>
      </div>
      <br></br>
      <div className="text-center">
        <p>Quick! Guess correctly to catch it! </p>
        <br></br>
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
        <br></br>
        <button
  onClick={() => {
    const monId = Math.floor(Math.random() * 1025) + 1
    window.location.href = `/game-2/${monId}`
  }}
  className="bg-#fbcb2a border border-black rounded-full px-4 py-2 text-sm mx-auto block w-fit"
>
  PASS
</button>
      </div>
    </>
  )
}
