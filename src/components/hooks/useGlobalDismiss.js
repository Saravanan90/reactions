import {useState, useEffect} from 'react'

export const useGlobalDismiss = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const dismiss = () => setShow(false)
    document.addEventListener('click', dismiss)
    
    return() => {
      document.removeEventListener('click', dismiss)
    }
  }, [])

  return [show, setShow]
}