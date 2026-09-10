import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Remonte en haut de page à chaque changement de route.
// Placé dans <BrowserRouter>, il couvre les routes publiques et admin.
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default ScrollToTop
