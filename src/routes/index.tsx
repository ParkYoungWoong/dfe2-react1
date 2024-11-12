import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import DefaultLayout from './layouts/Default.tsx'
import Home from './pages/Home.tsx'
import About from './pages/About.tsx'
import MovieDetails from './pages/MovieDetails.tsx'

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
        path: '/movies/:movieId',
        element: <MovieDetails />
      }
    ]
  }
])

export default function Router() {
  return <RouterProvider router={router} />
}
