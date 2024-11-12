import Header from '@/components/Header'
import { Outlet, ScrollRestoration } from 'react-router-dom'

export default function DefaultLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <ScrollRestoration />
    </>
  )
}
