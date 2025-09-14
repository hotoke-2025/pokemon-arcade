import AuthButtons from './components/AuthButtons';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Game1 from './components/Game1';
// import other game components as needed

export default function App() {
  return (
    <div>
      <header>
        <h1>Pokémon Games</h1>
        <AuthButtons />  {/* Buttons appear in header */}
      </header>

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/game-1" element={<Game1 />} />
        {/* other routes */}
      </Routes>
    </div>
  );
}
