import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'

const navigations = [
  {
    to: '/',
    label: 'Home'
  },
  {
    to: '/about',
    label: 'About'
  },
  {
    to: '/signin',
    label: 'Sign In'
  },
  {
    to: '/dashboard',
    label: 'Dashboard'
  },
  {
    to: '/movies',
    label: 'Movies'
  },
  {
    to: '/movies/tt4154796',
    label: 'Endgame'
  },
  {
    to: '/todos',
    label: 'Todos'
  }
]

export default function Header() {
  return (
    <header>
      <nav className={styles.nav}>
        {navigations.map(nav => (
          <NavLink
            key={nav.to}
            to={nav.to}
            className={({ isActive }) => (isActive ? styles.active : '')}
            end>
            {nav.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
