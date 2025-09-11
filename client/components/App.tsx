import { Outlet } from 'react-router'
import NavPokemon from './NavPokemon'

function App() {
  return (
    <>
      <div className="mx-auto h-auto max-w-md ">
        <h1>
          <img
            src="../public/images/pokemonarcadelogo.png"
            alt="pokemon arcade"
            className="mx-auto h-auto max-w-md"
          ></img>
          <NavPokemon />
        </h1>
        <main>
          {/* <h1 className="text-3xl font-bold underline">pokemon</h1> */}
          <Outlet />
        </main>
        <footer> PLACEHOLDER FOOTER </footer>
      </div>
    </>
  )
}

export default App
