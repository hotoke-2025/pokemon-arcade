// connect to user table database to get ids of caught mons
// display images of mons in the sides of homepage
// animate images - slowly scrolling vertically or bouncing off sides of screens


import { useEffect, useState } from 'react'
import { fetchCaughtPokemon } from '../apis/pokemon'
import { Pokemon } from '../../models/pokemonList'

interface Props {
  userId: number
}

export default function CaughtPokemonGallery({ userId }: Props) {
  const [caughtPokemon, setCaughtPokemon] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPokemon() {
      try {
        const data = await fetchCaughtPokemon(userId)
        setCaughtPokemon(data)
      } catch (err) {
        console.error('Error fetching caught Pokémon:', err)
      } finally {
        setLoading(false)
      }
    }
    loadPokemon()
  }, [userId])

  if (loading) return <p>Loading your Pokémon…</p>

  if (caughtPokemon.length === 0) {
    return <p>You haven’t caught any Pokémon yet!</p>
  }

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {caughtPokemon.map((mon) => (
        <div key={mon.id} className="flex flex-col items-center">
          <img
            src={mon.sprites.front_default}
            alt={mon.name}
            className="w-24 h-24 object-contain"
          />
          <p className="mt-2 text-center">{mon.name}</p>
        </div>
      ))}
    </div>
  )
}
