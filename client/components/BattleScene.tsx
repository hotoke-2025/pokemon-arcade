import { Link } from 'react-router'

export function BattleScene() {
  // const {data: pokemon,
  //   isPending,
  //   isError
  //   error,
  // } = useQuery({

  // })
  // if (isPending) {
  //   return <>Loading...</>
  // }

  // if (isError) {
  //   return <span>Error: {error.message}</span>
  // }

  //battle
  //damage
  //const health boolean is alive or notAlive
  // const isAlive = true

  //notAlive= explosion, back to map on click

  return (
    <>
      <button>
        <Link id="backBtn" to={'/game-1'}>
          {' '}
          Run Away{' '}
        </Link>
      </button>
      {/* <button id="fightBtn" isAlive="false">
        Fight!
      </button> */}
    </>
  )
}
