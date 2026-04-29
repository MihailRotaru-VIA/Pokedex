import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PokemonCard from '../components/PokemonCard'
import styles from './Pokedex.module.css'

const PAGE_SIZE = 20

export default function Pokedex() {
  const [page, setPage] = useState(0)
  const [list, setList] = useState([])
  const [pokemonData, setPokemonData] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setPokemonData([])
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${page * PAGE_SIZE}`)
      .then(r => r.json())
      .then(data => {
        setTotal(data.count)
        setList(data.results)
      })
  }, [page])

  useEffect(() => {
    if (list.length === 0) return
    Promise.all(list.map(p => fetch(p.url).then(r => r.json())))
      .then(setPokemonData)
  }, [list])

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>Pokédex</h1>
        <Link to="/about" className={styles.aboutBtn}>About</Link>
      </div>

      <div className={styles.grid}>
        {pokemonData.length === 0
          ? Array.from({ length: PAGE_SIZE }).map((_, i) => <div key={i} className={styles.skeleton} />)
          : pokemonData.map(p => <PokemonCard key={p.id} data={p} />)
        }
      </div>

      <div className={styles.pagination}>
        <button className={styles.pageBtn} onClick={() => setPage(p => p - 1)} disabled={page === 0}>← Prev</button>
        <span className={styles.pageInfo}>Page {page + 1} / {totalPages}</span>
        <button className={styles.pageBtn} onClick={() => setPage(p => p + 1)} disabled={page >= totalPages - 1}>Next →</button>
      </div>
    </main>
  )
}
