import Header from '@/components/Header'
import { useOutlet, ScrollRestoration, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

export default function DefaultLayout() {
  const location = useLocation()
  const outlet = useOutlet()
  return (
    <>
      <Header />
      <AnimatePresence>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, position: 'absolute' }}
          transition={{ duration: 0.3 }}>
          {outlet}
        </motion.div>
      </AnimatePresence>
      <ScrollRestoration />
    </>
  )
}
