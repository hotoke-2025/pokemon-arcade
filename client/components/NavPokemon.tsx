import { NavLink } from 'react-router'

export default function LineupNav() {
  return (
    <nav>
      <NavLink to="/pokemon/home">Home</NavLink>
      <NavLink to="/pokemon/game1">Game1</NavLink>
      <NavLink to="/pokemon/game2">Game2</NavLink>
      <NavLink to="/pokemon/game3">Game3</NavLink>
      <NavLink className="nav" to="/">
        view games
      </NavLink>
    </nav>
  )
}
