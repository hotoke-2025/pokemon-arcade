import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router'

import App from './components/App'
import ShowPokemon from './components/ShowPokemon'
import Game1 from './components/Game1'
import CaughtPokemon from './components/CaughtPokemon'
import UncaughtPokemon from './components/UncaughtPokemon'
import Game2 from './components/Game2'
import Game3 from './components/Game3'
import Home from './components/Home'
import BattleScene from './components/BattleScene'


export const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="/game-3" element={<Game3 />} />
    <Route path="/game-2" element={<Game2 />} />
    <Route path="/game-2/:monId" element={<ShowPokemon />} />
    <Route path="/game-2/caughtpokemon/:monId" element={<CaughtPokemon />} />
    <Route path="/game-2/uncaughtpokemon/:monId" element={<UncaughtPokemon />} />
    <Route path="/game-1" element={<Game1 />} />
    <Route path="/game-1/:monId" element={<BattleScene />} />
  </Route>,
)

export const router = createBrowserRouter(routes)

