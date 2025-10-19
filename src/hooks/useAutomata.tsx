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
    lastNodePrevTransition: false,
  },
  {
    id: 'B-C',
    source: 'B',
    target: 'C',
    label: 'T',
    isTransitionValid: false,
    prevTransition: 'A-B',
    lastNodePrevTransition: true,
  },
  {
    id: 'C-D',
    source: 'C',
    target: 'D',
    label: 'A',
    isTransitionValid: false,
    prevTransition: 'B-C',
    lastNodePrevTransition: false,
  },
  {
    id: 'C-E',
    source: 'C',
    target: 'E',
    label: 'T',
    isTransitionValid: false,
    prevTransition: 'B-C',
    lastNodePrevTransition: false,
  },
  {
    id: 'C-F',
    source: 'C',
    target: 'F',
    label: 'C',
    isTransitionValid: false,
    prevTransition: 'B-C',
    lastNodePrevTransition: true,
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
    if (numIsoleucinaCodons === 0 || value.length < dnaSequence.length) {
      handleTransitions(value)
    }
    identifyIsoleucineCodons(value)

    return true
  }

  const identifyIsoleucineCodons = (value: string) => {
    const regexToIdentifyIsoleucineCodons = new RegExp("AT[TAC]", "g");

    const matches = value.match(regexToIdentifyIsoleucineCodons)

    setNumIsoleucinaCodons(matches ? matches.length : 0)
  }

  const handleTransitions = (value: string) => {
    // console.log(transitions)
    // const numValidTransitions = transitions.filter(t => t.isTransitionValid).length
    
    // if (numValidTransitions > 3) {
    //   console.log('Max valid transitions reached')
    //   return
    // }

    const nucleotides = value.split('')
    let prevTransitions = [...initialTransitions]
    let newTransitions: TransitionType[] = []
    let numValidTransitions = 0

    for (let i = 0; i < nucleotides.length; i++) {
      const nucleotide = nucleotides[i]
      let foundValidTransition = false

      console.log(JSON.stringify(prevTransitions, null, 2))
      console.log(numValidTransitions)
      for (let j = 0; j < prevTransitions.length; j++) {
        const currentTransition = prevTransitions[j]

        if (foundValidTransition || numValidTransitions >= 3) {
          newTransitions.push(currentTransition)
          continue
        }

        if (currentTransition.isTransitionValid) {
          // i feel i have to do something here but idk what
          newTransitions.push(currentTransition)
          continue
        }

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

        if (currentTransition.prevTransition) {
          const prevTransitionIndex = newTransitions.findIndex(t => t.id === currentTransition.prevTransition)
          const prevTransition = prevTransitionIndex !== -1 ? newTransitions[prevTransitionIndex] : null

          if (prevTransition && prevTransition.isTransitionValid) {
            const isValid = nucleotide === currentTransition.label
            console.log(`Nucleotide: ${nucleotide}, Transition: ${currentTransition.id}, Is Valid: ${isValid}, Found Valid Transition: ${foundValidTransition}`)

            if (isValid && !foundValidTransition) {
              foundValidTransition = true
              numValidTransitions++
              newTransitions.push({
                ...currentTransition,
                isTransitionValid: true
              })
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
                numValidTransitions = 0
              }
              newTransitions.push(currentTransition);
            }
          } else {
            newTransitions.push(currentTransition);
          }
        }
      }

      prevTransitions = [...newTransitions]
      newTransitions = []
    }

    setTransitions(prevTransitions)
        // prevTransitions.forEach(currentTransition => {
        //   if (currentTransition.isTransitionValid) {
        //     newTransitions.push(currentTransition)
        //   }

        //   if (currentTransition.prevTransition) {
        //     const prevTransition = newTransitions.find(t => t.id === currentTransition.prevTransition)
        //   }

        //   if (currentTransition.prevTransition === null && !currentTransition.isTransitionValid) {
        //     const isValid = nucleotide === currentTransition.label
        //     return {
        //       ...currentTransition,
        //       isTransitionValid: isValid
        //     }
        //   } else if (currentTransition.prevTransition && !currentTransition.isTransitionValid) {
        //     const prevTransition = prevTransitions.find(t => t.id === currentTransition.prevTransition)

        //     if (prevTransition && prevTransition.isTransitionValid) {
        //       const isValid = nucleotide === currentTransition.label
        //       return {
        //         ...currentTransition,
        //         isTransitionValid: isValid
        //       }
        //     }
        //   }

        //   return currentTransition

        // console.log(JSON.stringify(newTransitions, null, 2))

        // const invalidTransitions: TransitionType[] = newTransitions.map(currentTransition => {
        //   if (currentTransition.isTransitionValid && currentTransition.prevTransition && numValidTransitions < 3) {
        //     const nextTransitions = newTransitions.filter(t => t.prevTransition === currentTransition.id)
        //     const hasValidNextTransition = nextTransitions.some(t => t.isTransitionValid)

        //     if (!hasValidNextTransition && nextTransitions.length > 0) {
        //       return {
        //         ...currentTransition,
        //         isTransitionValid: false
        //       }
        //     }
        //   }

        //   return currentTransition
        // })

        // console.log(JSON.stringify(invalidTransitions, null, 2))

        // return newTransitions

        // return prevTransitions.reduce((newTransitions: TransitionType[], currentTransition: TransitionType) => {
        //   const currentNumValidTransitions = newTransitions.filter(t => t.isTransitionValid).length

        //   console.log(`Nucleotide: ${nucleotide}, Num Valid Transitions: ${currentNumValidTransitions}`)

        //   if (currentTransition.prevTransition === null && !currentTransition.isTransitionValid) {
            
        //     const isValid = nucleotide === currentTransition.label
        //     newTransitions.push({
        //       ...currentTransition,
        //       isTransitionValid: isValid
        //     })

        //   } else if (currentTransition.prevTransition && !currentTransition.isTransitionValid) {
        //     const prevTransitionIndex = prevTransitions.findIndex(t => t.id === currentTransition.prevTransition)
        //     const prevTransition = prevTransitionIndex !== -1 ? prevTransitions[prevTransitionIndex] : null

        //     if (prevTransition && prevTransition.isTransitionValid) {
        //       const isValid = nucleotide === currentTransition.label

        //       if (!isValid && currentNumValidTransitions < 3) {
        //         console.log('Invalid transition, resetting previous transition:', prevTransition.id)
        //         newTransitions[prevTransitionIndex] = {
        //           ...prevTransition,
        //           isTransitionValid: false
        //         }
        //       }

        //       newTransitions.push({
        //         ...currentTransition,
        //         isTransitionValid: isValid
        //       })
        //     } else {
        //       newTransitions.push(currentTransition);
        //     }
        //   } else {
        //     newTransitions.push(currentTransition);
        //   }

        //   console.log(JSON.stringify(newTransitions, null, 2))

        //   return newTransitions
        // }, [] as TransitionType[])

        // return prevTransitions.map((transition) => {
        //   const numValidTransitions = prevTransitions.filter(t => t.isTransitionValid).length
        //   if (numValidTransitions >= 3) {
        //     return transition
        //   }
        //   if (transition.prevTransition === null && !transition.isTransitionValid) {
        //     return {
        //       ...transition,
        //       isTransitionValid: nucleotide === transition.label,
        //     }
        //   } else if (transition.prevTransition && !transition.isTransitionValid) {
        //     const prevTransition = prevTransitions.find(t => t.id === transition.prevTransition)
        //     if (prevTransition && prevTransition.isTransitionValid) {
        //       return {
        //         ...transition,
        //         isTransitionValid: nucleotide === transition.label,
        //       }
        //     }
        //   }
        //   return transition
        // })
      // })

    // })

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
