import { Outlet, Link } from 'react-router'
import NavPokemon from './NavPokemon'
import AuthButton from './AuthButton.tsx'
import Audio from './Audio'
import CaughtPokemonGallery from './CaughtPokemonGallery.tsx'

function App() {
  return (
    <div className="grid min-h-screen grid-cols-12 gap-4">
      {/* Left sidebar */}
      <aside className="col-span-2 hidden md:block">
        <CaughtPokemonGallery userId={1} />
      </aside>

      {/* Main content */}
      <div className="col-span-8 mx-auto h-auto max-w-2xl">
        <div className="audio">
          <Audio />
        </div>
        <div className="AuthButton">
          {' '}
          <AuthButton></AuthButton>
        </div>
        <h1>
          <Link to="/">
            <img
              src="/images/pokemonarcadelogo.png"
              alt="pokemon arcade"
              className="mx-auto h-auto max-w-md"
            />
          </Link>
        </h1>

        <h3 className="links" id="pixelify-sans">
          <NavPokemon />
        </h3>
        <main>
          <Outlet />
        </main>
        <footer className="text-center">
          {' '}
          © There&apos;s no shaymin losing!{' '}
        </footer>
      </div>

      {/* Right sidebar */}
      <aside className="col-span-2 hidden md:block">
        <CaughtPokemonGallery userId={1} />
      </aside>
    </div>
  )
}

export default App
