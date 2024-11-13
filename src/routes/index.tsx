import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.tsx'
import About from './pages/About.tsx'
import Movies from './pages/Movies.tsx'
import MovieDetails from './pages/MovieDetails.tsx'
import SignIn from './pages/SignIn.tsx'
import DefaultLayout from './layouts/Default.tsx'
import NotFound from './pages/NotFound.tsx'

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/movies',
        element: <Movies />,
        children: [
          {
            path: ':movieId',
            element: <MovieDetails />
          }
        ]
      },
      {
        path: '/signin',
        element: <SignIn />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])

// 페이지 관리
export default function Router() {
  return (
    <RouterProvider
      router={router}
      future={{ v7_startTransition: true }}
    />
  )
}
