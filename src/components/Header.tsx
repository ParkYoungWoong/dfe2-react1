import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'

const navigations = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/signin', label: 'Sign In' },
  { to: '/movies/tt4154796', label: 'Endgame' }
]

export default function Header() {
  return (
    <header>
      <nav>
        {navigations.map(nav => (
          <NavLink
            key={nav.to}
            to={nav.to}
            className={({ isActive }) => (isActive ? styles.active : '')}>
            {nav.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
