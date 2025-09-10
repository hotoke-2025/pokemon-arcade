//import { usePokemon } from '../hooks/usePokemon.ts'
import Layout from './Layout.tsx'

function App() {
  // const { data } = usePokemon()

  return (
    <>
      <div className="app">
        <h1 className="text-3xl font-bold underline">
          Fullstack Boilerplate - with Pokemon!
        </h1>
        {/* <ul>
          {data && data.map((pokemon) => <li key={pokemon}>{pokemon}</li>)}
        </ul> */}
        <Layout/>
        
      </div>
    </>
  )
}

export default App
