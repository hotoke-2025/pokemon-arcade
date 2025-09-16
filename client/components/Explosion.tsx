// import { Link } from 'react-router'

export function Explosion() {
  console.log('You Win!')
  return (
    <>
      {/* {' '}
      <button>
        <Link id="backBtn" to={'/game-1'}>
          {' '}
          Go back{' '}
        </Link>
      </button> */}
      <div>
        <h1>You Win!</h1>
        <img src="../images/explosion-boom.gif" alt="explosion"></img>
      </div>
    </>
  )
}

// To Do:
// STYLE:
// Make buttons not cut in half - Ask Annie
// Explosion and "You Win!" in the centre of the screen. Make pretty.
//move pokemon to the platform on battle background
