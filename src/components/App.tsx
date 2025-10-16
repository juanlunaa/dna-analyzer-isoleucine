import AutomataDisplay from './AutomataDisplay'
import DNAInput from './DNAInput'

function App() {
  return (
    <div className="app">
      <main className="app-main">
        <div className="content-wrapper">
          <DNAInput />
          <AutomataDisplay />
        </div>
      </main>
    </div>
  )
}

export default App
