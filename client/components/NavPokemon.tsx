import { NavLink } from 'react-router'


export default function Navbar() {
  
  return (
    <>
      
    <nav>
      <NavLink className="navButtons" to="/">
        Home
      </NavLink>

      <NavLink className="navButtons" to="/game-1/">
        {' '}
        Game 1{' '}
      </NavLink>

      <NavLink className="navButtons" to="/game-2/">
        {' '}
        Who&apos;s that Pokemon!{' '}
      </NavLink>

      <NavLink className="navButtons" to="/game-3/">
        {' '}
        Tic-Tac-Johto{' '}
      </NavLink>

      {/* <NavLink className="nav" to="/arcade">
        view games
      </NavLink> */}
    </nav>
    </>
  )
}
