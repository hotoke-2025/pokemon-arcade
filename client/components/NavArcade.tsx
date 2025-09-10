import PokemonNav from './NavPokemon.tsx'
import { Link } from 'react-router'
import { usePokemon } from '../hooks/usePokemon.ts'
// import LoadingIndicator from './LoadingIndicator.tsx'

export default function ArcadeList() {
  const { isPending, isError, data } = usePokemon()

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
      <PokemonNav />
      <h2>Games:</h2>
      <ul className="cards">
        {data?.arcade.map((data) => (
          <li key={data.id} className="card">
            <div className="location">
              <span className="title">{data.name}</span>
              <p className="data">{data.description}</p>
              <Link to={`/pokemon/${data.id}/edit`}>edit pokemon</Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
