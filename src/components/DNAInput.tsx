import { useState } from "react"

function DNAInput() {
  const [sequence, setSequence] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^ATCG]/g, "")
    setSequence(value)
  }

  return (
    <div className="dna-input-container">
      <form>
        <div className="input-header">
          <h2>Secuencia de ADN</h2>
          <p className="input-description">Ingrese una secuencia de ADN para identificar si contiene Isoleucina</p>
        </div>

        <input
          className="dna-input"
          value={sequence}
          onChange={handleChange}
          placeholder="ATGATCATTACG"
        />
      </form>
    </div>
  )
}

export default DNAInput