import { Link } from "react-router"

function Game2() {
  function getRandomMonId(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  const monId = getRandomMonId(1, 1025)

  return (
    <div>
      <br></br>
      <h2>Who's that Pokémon?</h2>
      <br></br>
      <p>Correct guesses add Pokémon to your Pokédex. But be careful, guess wrong and they’ll flee!</p>
      <br></br>
      <p>Click below to start!</p>
      <br></br>
      <Link to={`/game-2/${monId}`}><img className="mx-auto" src="/images/Kanto-Pokemon.webp" alt="Collection of Kanto Pokemon" /></Link>
    </div>
  )
}

export default Game2
