import { usePokemon } from '../hooks/usePokemon.ts'

function App() {
  const { data } = usePokemon()

  return (
    <>
      <div className="app">
        <h1 className="text-3xl font-bold underline">
          Fullstack Boilerplate - with Pokemon!
        </h1>
        <ul>
          {data && data.map((pokemon) => <li key={pokemon}>{pokemon}</li>)}
        </ul>
      </div>
    </>
  )
}

export default App
