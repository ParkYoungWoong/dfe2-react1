import { createRoot } from 'react-dom/client'
import Router from '@/routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Router />
  </QueryClientProvider>
)

// GET - 조회
//// useQuery
//// useInfiniteQuery

// POST - 생성
// PUT - 전체 수정
// PATCH - 부분 수정
// DELETE - 삭제
//// useMutation
