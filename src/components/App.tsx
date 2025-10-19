import useAutomata from '../hooks/useAutomata';
import AutomataDisplay from './AutomataDisplay'
import DNAInput from './DNAInput'

function App() {
  const { dnaSequence, numIsoleucinaCodons, isSequenceValid, transitions, handleDnaChange } = useAutomata();
  return (
    <div className="app">
      <main className="app-main">
        <div className="content-wrapper">
          <DNAInput dnaSequence={dnaSequence} handleDnaChange={handleDnaChange} />
          {isSequenceValid && (
              <span className="result-message">{`Secuencia de ADN valida con ${numIsoleucinaCodons} codones de Isoleucina identificados`}</span>
          )}
          {isSequenceValid === null && <span>Esperando secuencia de ADN</span>}
          <AutomataDisplay transitions={transitions} />
        </div>
      </main>
    </div>
  )
}

export default App
