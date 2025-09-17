import { Link } from 'react-router'
function Home() {
  return (
    <>
      <h1 className="m-8 text-center text-2xl font-bold">
        Choose a game to play!
      </h1>
      <div className="flex justify-center space-x-32">
        <Link to="/game-1">
          <p className="whitespace-nowrap">Pokemon Battle</p>
        </Link>
        <Link to="/game-2">
          <p className="mx-auto whitespace-nowrap">Who&apos;s that Pokemon!</p>
        </Link>
        <Link to="/game-3">
          <p className="whitespace-nowrap"> Tic-Tac-Johto</p>
        </Link>
      </div>
      <div className="mt-8 flex flex-nowrap justify-center space-x-8">
        <Link to="/game-1" className="inline-block w-64 flex-none">
          <img
            className="h-full w-full"
            src="/images/Game1.png"
            alt="Game1 - Pokemon Battle"
          />
        </Link>
        <Link to="/game-2" className="inline-block w-64 flex-none">
          <img
            className="w-full"
            src="/images/WTP.png"
            alt="Game2 - Who's that Pokemon!"
          />
        </Link>
        <Link to="/game-3" className="inline-block w-64 flex-none">
          <img
            className="w-full"
            src="/images/Game3.png"
            alt="Game3 - Tic-Tac-Johto"
          />
        </Link>
      </div>
    </>
  )
}

export default Home
