import { useState } from "react"
import type { TransitionType } from "../types"
import { initialTransitions } from "../const/InitialValues"

function useAutomata() {
  const [dnaSequence, setDnaSequence] = useState("")
  const [numIsoleucinaCodons, setNumIsoleucinaCodons] = useState(0)
  const [isSequenceValid, setIsSequenceValid] = useState<boolean|null>(null)
  const [transitions, setTransitions] = useState(initialTransitions)

  const handleDnaChange = (value: string): boolean => {
    // regular expression to validate DNA sequence (only A, T, G, C characters)
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
    handleTransitions(value)
    identifyIsoleucineCodons(value)

    return true
  }

  const identifyIsoleucineCodons = (value: string) => {
    // regular expression to identify isoleucine codons
    const regexToIdentifyIsoleucineCodons = new RegExp("AT[TAC]", "g");

    const matches = value.match(regexToIdentifyIsoleucineCodons)

    setNumIsoleucinaCodons(matches ? matches.length : 0)
  }

  const handleTransitions = (value: string) => {
    const nucleotides = value.split('')
    let prevTransitions = [...initialTransitions]
    let newTransitions: TransitionType[] = []
    let numValidTransitions = 0

    // iterate over each nucleotide in the DNA sequence
    for (let i = 0; i < nucleotides.length; i++) {
      const nucleotide = nucleotides[i]
      let foundValidTransition = false

      // reset after 3 valid transitions (1 codon) to start new codon evaluation
      if (numValidTransitions >= 3) {
        numValidTransitions = 0
        prevTransitions = [...initialTransitions]
      }

      // iterate over each transition to evaluate if the current nucleotide validates it
      for (let j = 0; j < prevTransitions.length; j++) {
        const currentTransition = prevTransitions[j]

        // if nucleotide is already validated for a previous transition or if the current transition is already valid, skip evaluation
        if (foundValidTransition || currentTransition.isTransitionValid) {
          newTransitions.push(currentTransition)
          continue
        }

        // evaluate transition without previous transition dependency, i mean the first transition in the automata
        if (currentTransition.prevTransition === null) {
          const isValid = nucleotide === currentTransition.label
          if (isValid) {
            foundValidTransition = true
            numValidTransitions++
          }
          newTransitions.push({
            ...currentTransition,
            isTransitionValid: isValid
          })
        }

        // evaluate transition with previous transition dependency
        if (currentTransition.prevTransition) {
          // find the previous transition object based on the prevTransition id
          const prevTransitionIndex = newTransitions.findIndex(t => t.id === currentTransition.prevTransition)
          const prevTransition = prevTransitionIndex !== -1 ? newTransitions[prevTransitionIndex] : null

          if (prevTransition && prevTransition.isTransitionValid) {
            const isValid = nucleotide === currentTransition.label

            // if nucleotide is valid for the current transition and no other transition has been validated in this nucleotide iteration
            // then validate this transition
            if (isValid && !foundValidTransition) {
              foundValidTransition = true
              numValidTransitions++
              newTransitions.push({
                ...currentTransition,
                isTransitionValid: true
              })
            // if nucleotide is not valid for the current transition
            // then check if we need to reset previous transitions, in case this be the last next transition of the previous transition
            // so if this occurs all previous transitions must be invalidated
            // for example: ATG -> A-B (valid), B-C (valid), C-D (not valid) => must reset A-B and B-C to not valid
            // special case: if nucleotide is the first one 'A' then we don't reset previous transitions because it could be the start of a new codon
            } else {
              if (!isValid && currentTransition.lastNodePrevTransition && nucleotide !== 'A') {
                let resetIndex = prevTransitionIndex
                while (resetIndex !== -1) {
                  const transitionToReset = newTransitions[resetIndex]
                  newTransitions[resetIndex] = {
                    ...transitionToReset,
                    isTransitionValid: false
                  }
                  resetIndex = newTransitions.findIndex(t => t.id === transitionToReset.prevTransition)
                }
                numValidTransitions = 0 // <- this invalidate the whole codon evaluation
              }
              newTransitions.push(currentTransition);
            }
          } else {
            newTransitions.push(currentTransition);
          }
        }
      }

      // prepare for the next nucleotide iteration
      // transitions of the next iteration will be the ones just evaluated
      // so we copy newTransitions to prevTransitions and reset newTransitions, ready for next evaluation
      prevTransitions = [...newTransitions]
      newTransitions = []
    }

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
