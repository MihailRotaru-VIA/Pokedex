import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import styles from './PokemonDetail.module.css'

const STAT_LABELS = { hp:'HP', attack:'ATK', defense:'DEF', 'special-attack':'SP.ATK', 'special-defense':'SP.DEF', speed:'SPD' }
const STAT_COLORS = { hp:'#f87171', attack:'#fb923c', defense:'#60a5fa', 'special-attack':'#c084fc', 'special-defense':'#34d399', speed:'#facc15' }

export default function PokemonDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [pokemon, setPokemon] = useState(null)
  const [species, setSpecies] = useState(null)

  useEffect(() => {
    setPokemon(null)
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(r => r.json())
      .then(data => {
        setPokemon(data)
        return fetch(data.species.url).then(r => r.json())
      })
      .then(setSpecies)
  }, [id])

  if (!pokemon) return <div className={styles.loading}>Loading…</div>

  const sprite = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default
  const types = pokemon.types.map(t => t.type.name)
  const flavor = species?.flavor_text_entries?.find(e => e.language.name === 'en')?.flavor_text?.replace(/\f|\n/g, ' ') || ''
  const prevId = pokemon.id > 1 ? pokemon.id - 1 : null
  const nextId = pokemon.id < 1010 ? pokemon.id + 1 : null

  return (
    <main className={styles.main}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>← Back</button>
        <div className={styles.arrows}>
          {prevId ? <Link to={`/pokemon/${prevId}`} className={styles.arrowBtn}>‹ #{String(prevId).padStart(3,'0')}</Link> : <span />}
          {nextId ? <Link to={`/pokemon/${nextId}`} className={styles.arrowBtn}>#{String(nextId).padStart(3,'0')} ›</Link> : <span />}
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.left}>
          <span className={styles.num}>#{String(pokemon.id).padStart(3,'0')}</span>
          <img src={sprite} alt={pokemon.name} className={styles.sprite} />
          <h1 className={styles.name}>{pokemon.name}</h1>
          <div className={styles.types}>
            {types.map(t => <span key={t} className={`type ${t}`}>{t}</span>)}
          </div>
          {flavor && <p className={styles.flavor}>"{flavor}"</p>}
        </div>

        <div className={styles.right}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Profile</h2>
            <div className={styles.profileRow}>
              <div className={styles.profileItem}><span className={styles.label}>Height</span><span className={styles.val}>{(pokemon.height/10).toFixed(1)}m</span></div>
              <div className={styles.profileItem}><span className={styles.label}>Weight</span><span className={styles.val}>{(pokemon.weight/10).toFixed(1)}kg</span></div>
              <div className={styles.profileItem}><span className={styles.label}>Base XP</span><span className={styles.val}>{pokemon.base_experience ?? '—'}</span></div>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Abilities</h2>
            <div className={styles.abilities}>
              {pokemon.abilities.map(a => (
                <span key={a.ability.name} className={`${styles.ability} ${a.is_hidden ? styles.hidden : ''}`}>
                  {a.ability.name.replace('-', ' ')}{a.is_hidden ? ' (hidden)' : ''}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Base Stats</h2>
            {pokemon.stats.map(s => (
              <div key={s.stat.name} className={styles.statRow}>
                <span className={styles.statLabel}>{STAT_LABELS[s.stat.name] || s.stat.name}</span>
                <span className={styles.statNum}>{s.base_stat}</span>
                <div className={styles.statTrack}>
                  <div className={styles.statFill} style={{ width: `${Math.min(s.base_stat/255*100,100)}%`, background: STAT_COLORS[s.stat.name] }} />
                </div>
              </div>
            ))}
            <div className={styles.statTotal}>
              <span>Total</span>
              <span>{pokemon.stats.reduce((a,s) => a + s.base_stat, 0)}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
