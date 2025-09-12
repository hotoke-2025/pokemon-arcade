import { Link } from 'react-router'

export function wildPokemon() {
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
  return (
    <>
      <button>
        <Link id="backBtn" to={'/game-1'}>
          {' '}
          Run Away{' '}
        </Link>
      </button>
    </>
  )
}
