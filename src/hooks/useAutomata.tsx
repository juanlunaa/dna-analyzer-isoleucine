import { useState } from "react"
import type { TransitionType } from "../types"

const initialTransitions: TransitionType[] = [
  {
    id: 'A-B',
    source: 'A',
    target: 'B',
    label: 'A',
    isTransitionValid: false,
    prevTransition: null,
  },
  {
    id: 'B-C',
    source: 'B',
    target: 'C',
    label: 'T',
    isTransitionValid: false,
    prevTransition: 'A-B',
  },
  {
    id: 'C-D',
    source: 'C',
    target: 'D',
    label: 'A',
    isTransitionValid: false,
    prevTransition: 'B-C',
  },
  {
    id: 'C-E',
    source: 'C',
    target: 'E',
    label: 'T',
    isTransitionValid: false,
    prevTransition: 'B-C',
  },
  {
    id: 'C-F',
    source: 'C',
    target: 'F',
    label: 'C',
    isTransitionValid: false,
    prevTransition: 'B-C',
  },
]

function useAutomata() {
  const [dnaSequence, setDnaSequence] = useState("")
  const [numIsoleucinaCodons, setNumIsoleucinaCodons] = useState(0)
  const [isSequenceValid, setIsSequenceValid] = useState<boolean|null>(null)
  const [transitions, setTransitions] = useState(initialTransitions)

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
    handleTransitions(dnaSequence, value)

    return true
  }

  const identifyIsoleucineCodons = (value: string) => {
    const regexToIdentifyIsoleucineCodons = new RegExp("AT[TAC]", "g");

    const matches = value.match(regexToIdentifyIsoleucineCodons)

    setNumIsoleucinaCodons(matches ? matches.length : 0)
  }

  const handleTransitions = (prevValue: string, value: string) => {
    const lastValue = value.slice(-1)
    console.log('lastValue', lastValue)

    const prevTransitions = prevValue.length > value.length ? initialTransitions : [...transitions]
    
    for (let i = 0; i < prevTransitions.length; i++) {
      const currentTransition = prevTransitions[i]
      
      if (!currentTransition.isTransitionValid) {
        if (currentTransition.prevTransition === null) {
          prevTransitions[i].isTransitionValid = lastValue === currentTransition.label
          continue
        } else {
          const prevTransition = prevTransitions.find(transition => transition.id === currentTransition.prevTransition)
          if (prevTransition && !prevTransition.isTransitionValid) {
            continue
          }
          const isValid = lastValue === currentTransition.label
          prevTransitions[i].isTransitionValid = isValid
          if (isValid) {
            break
          }
        }
      }
    }

    console.log(prevTransitions)

    setTransitions(prevTransitions)
  }

  return {
    dnaSequence,
    numIsoleucinaCodons,
    isSequenceValid,
    transitions,
    handleDnaChange
  }
}

export default useAutomata;
