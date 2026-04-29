import { Link } from 'react-router-dom'
import styles from './PokemonCard.module.css'

export default function PokemonCard({ data }) {
  const sprite = data.sprites.other['official-artwork'].front_default || data.sprites.front_default
  const types = data.types.map(t => t.type.name)

  return (
    <Link to={`/pokemon/${data.id}`} className={styles.card}>
      <span className={styles.num}>#{String(data.id).padStart(3, '0')}</span>
      <img src={sprite} alt={data.name} className={styles.sprite} loading="lazy" />
      <h3 className={styles.name}>{data.name}</h3>
      <div className={styles.types}>
        {types.map(t => <span key={t} className={`type ${t}`}>{t}</span>)}
      </div>
    </Link>
  )
}
