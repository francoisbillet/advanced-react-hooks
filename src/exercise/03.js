import * as React from 'react'

function CountProvider(props) {
  const [count, setCount] = React.useState(0)
  const value = [count, setCount]
  return <CountContext.Provider value={value} {...props} /> // Or opening and closing tags with {children} in between
}

function useCount() {
  const countCountext = React.useContext(CountContext)
  if (!countCountext) {
    throw new Error('useCount may only be used from within a CountProvider')
  }

  return countCountext
}

const CountContext = React.createContext()

function CountDisplay() {
  const [count] = useCount()
  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  const [, setCount] = useCount()
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>Increment count</button>
}

function App() {
  return (
    <div>
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  )
}

export default App
