import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Experience from './pages/Experience'
import Loading from './components/Loading'

export const router = createBrowserRouter(
  [
    { path: '/', element: <Home /> },
    { path: '/experience', element: <Experience /> },
    { path: '/loading', element: <Loading /> },
  ],
  { basename: import.meta.env.BASE_URL }
)
