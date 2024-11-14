import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import SignIn from './pages/SignIn'
import DefaultLayout from './layouts/Default'
import NotFound from './pages/NotFound'
import Dashboard from './pages/Dashboard'
import { requiresAuth } from './loaders/requiresAuth'

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
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
        loader: requiresAuth
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
