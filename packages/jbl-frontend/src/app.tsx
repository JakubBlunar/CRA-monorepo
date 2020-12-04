import { formatDate } from '@jbl/core'
import { Clock } from '@jbl/ui'

export const App = () => (
  <div>
    <h1>JBL&apos;s monorepo</h1>
    <p>Clock will be formated by formatDate function from @jbl/core library as {formatDate(new Date())}</p>
    <p>Clock component that will display current date and time is used from @jbl/ui library</p>
    <Clock />
  </div>
)
