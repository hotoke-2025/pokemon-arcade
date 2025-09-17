import { Outlet, Link } from 'react-router'
import NavPokemon from './NavPokemon'
import AuthButton from './AuthButton.tsx';
import Audio from './Audio'

function App() {
  return (
    <>
      <div className="mx-auto h-auto max-w-md ">
        <div className="audio">
      {/* <AuthButton></AuthButton> */}
          <Audio/>
        </div>
        <div className= "AuthButton"> <AuthButton></AuthButton></div>
        <h1>
          <Link to="/">
          <img
            src="/images/pokemonarcadelogo.png"
            alt="pokemon arcade"
            className="mx-auto h-auto max-w-md"
          />
          </Link>
        </h1>

        <h2 className="links" id="pixelify-sans">
          <NavPokemon />
        </h2>
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

//       <Routes>
//         <Route path="/home" element={<Home />} />
//         <Route path="/game-1" element={<Game1 />} />
//         {/* other routes */}
//       </Routes>
//     </div>
//   );
// }
export default App
