import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DfaService, DFAState, ValidationResult } from '../../services/dfa.service';

@Component({
  selector: 'app-transition-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transition-table.component.html',
  styleUrl: './transition-table.component.css',
})
export class TransitionTableComponent implements OnInit {
  states: DFAState[] = []
  validationResult: ValidationResult = { isValid: true, errors: [] }
  startStateName: string = ''

  constructor(private dfaService: DfaService) {}

  ngOnInit(): void {
    const DFA = this.dfaService.getDFA()
    if (DFA && DFA.states.length > 0) {
      this.states = DFA.states
      this.startStateName = DFA.startState
    } else {
      // Initialize with one empty state
      this.addState()
    }
    
    if (this.validate()) {
      this.saveDFA()
    }
  }

  addState(): void {
    const newState: DFAState = {
      name: `q${this.states.length}`,
      isAccepting: false,
      transitionA: '',
      transitionB: ''
    }
    this.states.push(newState)
    
    // Set first state as start state if not set
    if (this.states.length === 1) {
      this.startStateName = newState.name
    }
    
    if (this.validate()) {
      this.saveDFA
    }
  }

  removeState(index: number): void {
    if (this.states.length > 1) {
      const removedStateName = this.states[index].name
      this.states.splice(index, 1)
      
      // If the state with the start state is removed set it to the first state
      if (this.startStateName === removedStateName) {
        this.startStateName = this.states.length > 0 ? this.states[0].name : ''
      }
      
      if (this.validate()) {
        this.saveDFA
      }
    }
  }

  onInputChange(): void {
    if (this.validate()) {
      this.saveDFA
    }
  }

  validate(): boolean {
    this.validationResult = this.dfaService.validateDFA(this.states)
    return this.validationResult.isValid
  }

  saveDFA(): void {
    this.dfaService.setDFA({
      states: this.states,
      startState: this.startStateName
    })
  }

  clearAll(): void {
    this.states = []
    this.startStateName = ''
    this.addState() // Add one empty state
  }

  getStateNames(): string[] {
    return this.states.map(s => s.name).filter(name => name.trim() !== '')
  }
}
