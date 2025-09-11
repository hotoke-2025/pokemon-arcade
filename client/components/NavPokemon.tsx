import { NavLink } from 'react-router'

export default function LineupNav() {
  return (
    <nav>
      <NavLink to="/home/">Home </NavLink>
      <NavLink to="/game-1/">Whos that Pokemon! </NavLink>
      <NavLink to="/game-2/">Game2 </NavLink>
      <NavLink to="/game-3/">Game3 </NavLink>
      <NavLink className="nav" to="/arcade">
        view games
      </NavLink>
    </nav>
  )
}
