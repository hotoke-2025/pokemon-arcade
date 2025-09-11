import PokemonNav from './NavPokemon.tsx'
import { Link } from 'react-router'
import useArcade from '../hooks/useArcade.ts'

// import LoadingIndicator from './LoadingIndicator.tsx'

export default function ArcadeList() {
  const { isPending, isError, data } = useArcade()

  if (isPending) {
    return (
      <>
        <PokemonNav />
        {/* <LoadingIndicator /> */}
      </>
    )
  }

  if (isError) {
    return <>Oops</>
  }

  return (
    <>
      {/* <PokemonNav /> */}
      <h2>Games:</h2>
      <ul className="cards">
        {data?.arcade.map((arcade) => (
          <li key={arcade.id} className="card">
            <div className="location">
              <span className="title">{arcade.name}</span>
              <p className="data">{arcade.description}</p>
              <Link to={`/pokemon/${arcade.id}/edit`}>edit pokemon</Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
