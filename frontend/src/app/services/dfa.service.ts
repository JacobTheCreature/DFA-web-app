import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface DFAState {
  name: string,
  isAccepting: boolean,
  transitionA: string,
  transitionB: string
}

export type Alphabet = 'ab' | '01'

export interface DFA {
  states: DFAState[],
  startState: string,
  alphabet: Alphabet
}

export interface ValidationResult {
  isValid: boolean,
  errors: string[]
}

@Injectable({
  providedIn: 'root',
})
export class DfaService {
  private dfaSubject = new BehaviorSubject<DFA | null>(null)
  public dfa$: Observable<DFA | null> = this.dfaSubject.asObservable()

  constructor() {}

  setDFA(dfa: DFA): void {
    this.dfaSubject.next(dfa)
  }

  getDFA(): DFA | null {
    return this.dfaSubject.value
  }

  validateDFA(states: DFAState[], alphabet: Alphabet = 'ab'): ValidationResult {
    const errors: string[] = []
    const [symbol1, symbol2] = alphabet === 'ab' ? ['a', 'b'] : ['0', '1']

    if (states.length === 0) {
      errors.push('DFA must have at least one state')
      return { isValid: false, errors }
    }

    const stateNames = states.map(s => s.name)

    // Check for empty state names
    if (stateNames.some(name => !name || name.trim() === '')) {
      errors.push('All states must have names')
    }

    // Check for duplicate state names
    const duplicates = stateNames.filter((name, index) => 
      stateNames.indexOf(name) !== index
    )
    if (duplicates.length > 0) {
      errors.push(`Duplicate state names: ${[...new Set(duplicates)].join(', ')}`)
    }

    // Make sure all transitions point to valid states or dead state
    states.forEach(state => {
      // If I delete or rename a state that has other states transition to it this will catch the "invalid name" error
      // Should just make a function to re-set the values to the new name from the old name for all states that go to it
      if (state.transitionA && state.transitionA !== 'DEAD' && !stateNames.includes(state.transitionA)) {
        errors.push(`State "${state.name}" has invalid transition on '${symbol1}': "${state.transitionA}"`)
      }
      if (state.transitionB && state.transitionB !== 'DEAD' && !stateNames.includes(state.transitionB)) {
        errors.push(`State "${state.name}" has invalid transition on '${symbol2}': "${state.transitionB}"`)
      }
      // DFA must have transitions for all possible inputs
      if (!state.transitionA) {
        errors.push(`State "${state.name}" is missing transition on '${symbol1}'`)
      }
      if (!state.transitionB) {
        errors.push(`State "${state.name}" is missing transition on '${symbol2}'`)
      }
    })

    // Must have at least one accepting state
    if (!states.some(s => s.isAccepting)) {
      errors.push('DFA must have at least one accepting state')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }
}
