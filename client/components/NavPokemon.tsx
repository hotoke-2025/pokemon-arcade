import { NavLink } from 'react-router'

export default function Navbar() {
  return (
    <nav>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/game-1/"> Game 1 </NavLink>
      <NavLink to="/game-2/"> Whos that Pokemon! </NavLink>
      <NavLink to="/game-3/"> Tick-Tack-Jotoh </NavLink>
      {/* <NavLink className="nav" to="/arcade">
        view games
      </NavLink> */}
    </nav>
  )
}
