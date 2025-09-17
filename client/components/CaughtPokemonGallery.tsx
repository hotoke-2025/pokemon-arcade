// connect to user table database to get ids of caught mons
// display images of mons in the sides of homepage
// animate images - slowly scrolling vertically or bouncing off sides of screens

import { usePokedex } from '../hooks/usePokedex'

interface Props {
  userId: number
}

export default function CaughtPokemonGallery({ userId }: Props) {
  const {
    data: pokemons,
    isLoadingProperties,
    isErrorProperties,
    error,
  } = usePokedex()
  if (isLoadingProperties) return <p>Loading...</p>
  if (isErrorProperties) return <p>Error: {(error as Error).message}</p>
  // console.log('Pokedex data:', pokemons)

  const caughtPokemon = pokemons
  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {caughtPokemon.map((mon) => (
        <div key={mon.id} className="flex flex-col items-center">
          <img
            src={mon.image}
            alt={mon.name}
            className="h-16 w-16 object-contain"
          />
        </div>
      ))}
    </div>
  )
}
