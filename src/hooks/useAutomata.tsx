import { useState } from "react"

function useAutomata() {
  const [dnaSequence, setDnaSequence] = useState("")
  const [numIsoleucinaCodons, setNumIsoleucinaCodons] = useState(0)
  const [isSequenceValid, setIsSequenceValid] = useState<boolean|null>(null)

  const handleDnaChange = (value: string): boolean => {
    const regexToValidDNAComponent = new RegExp("^[ATGC]*$")
    
    if (!regexToValidDNAComponent.test(value)) {
      return false
    }
    
    if (value.length === 0) {
      setIsSequenceValid(null)
    } else {
      setIsSequenceValid(true)
    }

    setDnaSequence(value)
    identifyIsoleucineCodons(value)

    return true
  }

  const identifyIsoleucineCodons = (value: string) => {
    const regexToIdentifyIsoleucineCodons = new RegExp("AT[TAC]", "g");

    const matches = value.match(regexToIdentifyIsoleucineCodons)

    setNumIsoleucinaCodons(matches ? matches.length : 0)
  }

  return {
    dnaSequence,
    numIsoleucinaCodons,
    isSequenceValid,
    handleDnaChange
  }
}

export default useAutomata;
