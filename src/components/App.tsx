import { initialGlutamineNodes, initialIsoleucineNodes, initialPhenylalanineNodes } from '../const/InitialValues';
import useAutomata from '../hooks/useAutomata';
import AutomataDisplay from './AutomataDisplay'
import DNAInput from './DNAInput'

function App() {
  const {
    dnaSequence,
    numCodons,
    isSequenceValid,
    isoleucineTransitions,
    phenylalanineTransitions,
    glutamineTransitions,
    handleDnaChange
  } = useAutomata();

  return (
    <div className="app">
      <main className="app-main">
        <div className="content-wrapper">
          <DNAInput dnaSequence={dnaSequence} handleDnaChange={handleDnaChange} />
          {isSequenceValid && (
              <span className="result-message">{`Secuencia de ADN valida con ${numCodons.isoleucine} codones de Isoleucina, ${numCodons.phenylalanine} codones de Fenilalina y ${numCodons.glutamine} codones de Glutamina.`}</span>
          )}
          {isSequenceValid === null && <span>Esperando secuencia de ADN</span>}
          <div className="automata-container">
            <div className="automata-header">
              <h3>Autómatas Finitos Deterministas</h3>
            </div>

            <div className="automata-elements-container">
              <AutomataDisplay title="AFD: Isoleucina" numCodons={numCodons.isoleucine} transitions={isoleucineTransitions} nodes={initialIsoleucineNodes} />
              <AutomataDisplay title="AFD: Fenilalina" numCodons={numCodons.phenylalanine} transitions={phenylalanineTransitions} nodes={initialPhenylalanineNodes} />
              <AutomataDisplay title="AFD: Glutamina" numCodons={numCodons.glutamine} transitions={glutamineTransitions} nodes={initialGlutamineNodes} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
