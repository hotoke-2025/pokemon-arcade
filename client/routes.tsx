import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router'

import App from './components/App'
//import Home from './components/Home'
import ShowPokemon from './components/ShowPokemon'

const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    {/* <Route index element={<Home />} /> */}
    <Route path='/:monId' element={<ShowPokemon />}/>
  </Route>,
)

const router = createBrowserRouter(routes)

export default router

