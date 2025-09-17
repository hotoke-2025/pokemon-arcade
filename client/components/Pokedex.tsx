import { useDeletePokemon, usePokedex } from '../hooks/usePokedex'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateNickname } from '../apis/pokemon'
import { useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react'

export default function Pokedex() {
  const {
    data: pokemons,
    isLoadingProperties,
    isErrorProperties,
    error,
  } = usePokedex()
  const deletePokemon = useDeletePokemon()
  const { getAccessTokenSilently } = useAuth0()
  const queryClient = useQueryClient()
  const [nicknameEdits, setNicknameEdits] = useState<{ [id: number]: string }>(
    {},
  )

  const updateNicknameMutation = useMutation({
    mutationFn: async ({ id, nickname }: { id: number; nickname: string }) => {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: 'https://pokemon-arcade/api',
        },
      })
      return updateNickname(id, nickname, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pokedex'] })
    },
    onError: (err) => {
      console.error('Failed to update nickname:', err)
    },
  })

  const handleNicknameChange = (id: number, value: string) => {
    setNicknameEdits((prev) => ({ ...prev, [id]: value }))
  }

  const handleNicknameSave = (id: number) => {
    const nickname = nicknameEdits[id]
    if (!nickname) return
    updateNicknameMutation.mutate({ id, nickname })
    alert('Nickname successfully saved')
  }

  const handleDelete = async (id: number) => {
    try {
      await deletePokemon.mutateAsync(id)
      alert('Pokemon released')
    } catch (error) {
      console.log(error)
      alert('Pokemon not released')
    }
  }
  if (isLoadingProperties) return <p>Loading...</p>
  if (isErrorProperties) return <p>Error: {(error as Error).message}</p>
  console.log('Pokedex data:', pokemons)

  return (
    <div>
      <h1 className="text-center">Who&apos;s that Pokemon Pokedex</h1>
      <div id="custom-notification" className="notification-hidden">
        <p id="notification-message"> </p>
      </div>
      <table>
        <thead>
          <tr>
            <td>
              <strong>Catch ID</strong>
            </td>
            <td>
              <strong>Pokemon</strong>
            </td>
            <td>
              <strong>Nickname</strong>
            </td>
            <td>
              <strong>Release Pokemon</strong>
            </td>
          </tr>
        </thead>
        <tbody>
          {' '}
          {pokemons?.map(
            (pokemon: {
              id: number
              name: string
              nickname?: string
              image: string
            }) => (
              <tr key={pokemon.id}>
                <td>#{pokemon.id}</td>
                <td>
                  <img src={pokemon.image} alt={pokemon.name} />
                  {pokemon.name}
                </td>
                <td>
                  <input
                    className="nickname"
                    type="text"
                    defaultValue={pokemon.nickname}
                    onChange={(e) =>
                      handleNicknameChange(pokemon.id, e.target.value)
                    }
                  />
                  <button
                    className="saveBtn"
                    onClick={() => handleNicknameSave(pokemon.id)}
                  >
                    Save
                  </button>
                </td>
                <td>
                  <button
                    className="delBtn"
                    onClick={() => handleDelete(pokemon.id)}
                  >
                    Release {pokemon.name}
                  </button>
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  )
}
