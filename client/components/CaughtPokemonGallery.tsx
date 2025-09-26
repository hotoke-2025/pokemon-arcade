import { usePokedex } from '../hooks/usePokedex'

interface Props {
  userId: number
}
  interface mon {
  id: number,
  image: string,
  name: string,
}

export default function CaughtPokemonGallery({ userId }: Props) {
  console.log(userId)
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
      {caughtPokemon.map((mon: mon) => (
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
