import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from '@/routes'
// import '@/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>
)

// route - 개별 페이지 정보
// routes - 페이지 정보
// router - 페이지 제어
