import { Outlet } from 'react-router'

function App() {

  return (
    <>
      <div className="app">
        <header>
          <h1>Pokemon Arcade!</h1>
          {/* nav bar gets called here */}
        </header>
        <main>
          <h1 className="text-3xl font-bold underline">
            Pokémon Arcade
          </h1>
          <Outlet />
        </main>
        <footer className='text-center'> © There&apos;s no shaymin losing! </footer>
      </div>
    </>
  )
}

export default App
