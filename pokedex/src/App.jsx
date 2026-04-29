import { Routes, Route } from 'react-router-dom'
import Pokedex from './pages/Pokedex'
import PokemonDetail from './pages/PokemonDetail'
import About from './pages/About'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Pokedex />} />
      <Route path="/pokemon/:id" element={<PokemonDetail />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}
