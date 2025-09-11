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
        </h1>
        <h3 className="links" id="pixelify-sans">
          <NavPokemon />
        </h3>
        <main>
          {/* <h1 className="text-3xl font-bold underline">pokemon</h1> */}
          <Outlet />
        </main>
        <footer className="text-center">
          {' '}
          © There&apos;s no shaymin losing!{' '}
        </footer>
      </div>
    </>
  )
}

export default App
