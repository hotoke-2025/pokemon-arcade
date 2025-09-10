import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router'

import App from './components/App'
//import Home from './components/Home'
import ShowPokemon from './components/ShowPokemon'
import Game1 from './components/Game1'

const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    {/* <Route index element={<Home />} /> */}
    <Route path="/:monId" element={<ShowPokemon />} />
    <Route path="/game-1" element={<Game1 />} />
  </Route>,
)

const router = createBrowserRouter(routes)

export default router
