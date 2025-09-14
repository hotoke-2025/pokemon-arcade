import { NavLink } from 'react-router'
import { IfAuthenticated, IfNotAuthenticated }  from './AuthButton'
import { useAuth0 } from '@auth0/auth0-react'

export default function Navbar() {
  const { user, logout, loginWithRedirect } = useAuth0()

  const handleSignOut = () => {
    
    logout()
  }

  const handleSignIn = () => {

    loginWithRedirect()
  }
  
  return (
    <>
        <IfAuthenticated>
          <button onClick={handleSignOut}>Sign out</button>
          {user && <p>Signed in as: {user?.nickname}</p>}
          {/* {console.log(user)} */}
        </IfAuthenticated>
        <IfNotAuthenticated>
          <button onClick={handleSignIn}>Sign in</button>
        </IfNotAuthenticated>
      
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
