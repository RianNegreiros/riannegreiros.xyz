import { useState, useEffect } from 'react'

export function useFadingState(value: boolean, delay = 300) {
  const [visible, setVisible] = useState(value)
  const [fading, setFading] = useState(false)
  useEffect(() => {
    if (value) {
      setFading(false)
      setVisible(true)
    } else {
      setFading(true)
      const t = setTimeout(() => setVisible(false), delay)
      return () => clearTimeout(t)
    }
  }, [value, delay])
  return { visible, fading }
}
