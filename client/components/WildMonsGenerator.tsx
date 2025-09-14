import { Link } from "react-router"

interface Mon {
  id: number
  top: number
  left: number
}

interface Props {
  mons: Mon[]
  setMons: (mons: Mon[]) => React.Dispatch<
    React.SetStateAction<
      {
        id: number
        top: number
        left: number
      }[]
    >
  >
}

function getRandomMonId(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
const monId = getRandomMonId(1, 1025)

function Mons({ mons, setMons }: Props) {
  const image = 'https://media.tenor.com/UZJd1pjj4NMAAAAe/surprised-pikachu.png'

  return (
 <div>
      {mons.map((mon) => (
        <Link key={mon.id} to={`/game-1/${monId}`}>
          <img
            alt={`wild-pokemon-${mon.id}`}
            style={{
              top: `${mon.top}px`,
              left: `${mon.left}px`,
              width: '4%',
              position: 'absolute',
            }}
            src={image}
          />
        </Link>
      ))}
    </div>
  )
}

export default Mons
