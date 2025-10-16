function AutomataDisplay() {
  return (
    <div className="automata-container">
      <div className="automata-header">
        <h3>Autómata Finito Determinista</h3>
        <span className="automata-badge">Representación Gráfica</span>
      </div>

      <div className="automata-canvas">
        <div className="automata-placeholder">
          <p>El autómata se visualizará aquí</p>
        </div>
      </div>
    </div>
  )
}

export default AutomataDisplay