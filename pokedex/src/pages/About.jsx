import { useNavigate } from 'react-router-dom'
import styles from './About.module.css'

export default function About() {
  const navigate = useNavigate()

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>← Back</button>
        <h1 className={styles.title}>About</h1>
        <p className={styles.desc}>
          A Pokédex built with React, Vite, and React Router. Data from <a href="https://pokeapi.co" target="_blank" rel="noreferrer">PokéAPI</a>.
        </p>
        <div className={styles.stack}>
          {['React', 'Vite', 'React Router', 'PokéAPI'].map(s => (
            <span key={s} className={styles.tag}>{s}</span>
          ))}
        </div>
      </div>
    </main>
  )
}
