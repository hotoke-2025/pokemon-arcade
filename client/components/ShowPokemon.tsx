import { useNavigate, useParams } from 'react-router'
import { fetchPokemonById, addPokedex, AddPokedexInput, CaughtPokemon } from '../apis/pokemon'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'


export default function ShowPokemon() {
  const { monId } = useParams()
  const navigate = useNavigate()
  const [hiddenPokemon, setHiddenPokemon] = useState('')

  const queryClient = useQueryClient()
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()

  const {
    data: pokemon,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['pokemon', monId],
    queryFn: () => fetchPokemonById(Number(monId)),
  })

  const addPokemonMutation = useMutation< CaughtPokemon, Error, AddPokedexInput & { token: string }>({
  mutationFn: ({ token, ...pokemon }) => addPokedex(pokemon, token),
  onSuccess: () => {
    queryClient.invalidateQueries({queryKey: ['pokedex']})
  },
  onError: (error: Error) => {
    console.log(error.message || 'Failed to add pokemon')
  },
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

  const handleSubmit = async () => {
    if (!pokemon) return
    if (hiddenPokemon.toUpperCase() == pokemon.name.toUpperCase()) {
      if (isAuthenticated){
        try {
          const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: 'https://pokemon-arcade/api',
            },
          })
          console.log('Attempting to add pokemon', pokemon.name)
          await addPokemonMutation.mutateAsync({
          name: pokemon.name,
          nickname: '',     // Need to add an input for setting nickname
          released: false,
          token,
          image: pokemon.sprites.front_default,
        })
      } catch (error){
        console.error('Failed to add pokemon:', error)
      }
    }
      navigate(`/game-2/caughtpokemon/${monId}`)
    } else {
      navigate(`/game-2/uncaughtpokemon/${monId}`)
    }
  }
  console.log(pokemon.name)
  return (
    <>
    <br></br>
      <p>A wild Pokémon has appeared!</p>
      <div className="wtp-container">
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
        <div className="flex justify-center gap-4 mt-4">
  <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
  <button
  className="submitButton"
  onClick={handleSubmit}>
    Submit
  </button>

  <button
  className="skipButton"
  onClick={() => {
      const monId = Math.floor(Math.random() * 1025) + 1
      window.location.href = `/game-2/${monId}`
    }}
  >
    Skip
  </button>
</div>
</div>
      </div>
    </>
  )
}
