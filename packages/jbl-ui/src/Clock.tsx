import { useState } from 'react'
import { useInterval } from './helpers'
import { formatDate } from '@jbl/core'

export const Clock = () => {
  const [time, setTime] = useState<string>()

  useInterval(() => {
    setTime(formatDate(new Date()))
  }, 1000)

  return (
    <div>
      <h2>Clock</h2>
      <p>The time is {time}.</p>
    </div>
  )
}
