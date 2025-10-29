import { useRef, useState } from "react"

interface DNAInputProps {
  dnaSequence: string
  handleDnaChange: (value: string) => boolean
}

function DNAInput ({ dnaSequence, handleDnaChange }: DNAInputProps) {
  const [hasError, setHasError] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase()
    const isValid = handleDnaChange(value)
    
    if (isValid) {
      setHasError(false)
      timeoutRef.current = null
      return
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    setHasError(!isValid)

    timeoutRef.current = window.setTimeout(() => {
      setHasError(false)
      timeoutRef.current = null
    }, 300)
  }

  return (
    <div className="dna-input-container">
      <form>
        <div className="input-header">
          <h2>Secuencia de ADN</h2>
          <p className="input-description">Ingrese una secuencia de ADN para identificar sus aminoacidos (isoleucina, fenilalina, glutamina)</p>
        </div>

        <input
          className={`dna-input ${hasError ? 'shake' : ''}`}
          value={dnaSequence}
          onChange={handleChange}
          placeholder="ATTATA"
        />
      </form>
    </div>
  )
}

export default DNAInput