import { Link } from "react-router"

function Game2() {
  function getRandomMonId(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  const monId = getRandomMonId(1, 1025)

  return (
    <div>
      <p>Click to search for Pokémon</p>

      <Link to={`/game-2/${monId}`}><img className="mx-auto" src="/images/Kanto-Pokemon.webp" alt="Collection of Kanto Pokemon" /></Link>
    </div>
  )
}

export default Game2
