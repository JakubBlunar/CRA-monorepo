import _ from 'lodash'
import { useEffect, useRef } from 'react'

type IntervalCallback = () => void

export function useInterval(callback: IntervalCallback, delay: number) {
  const savedCallback = useRef<IntervalCallback>(_.noop)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick() {
      if (savedCallback) savedCallback.current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
    return undefined
  }, [delay])
}
