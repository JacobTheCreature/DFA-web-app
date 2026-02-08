import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DfaService, DFA } from '../../services/dfa.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dfa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dfa.component.html',
  styleUrl: './dfa.component.css',
})
export class DfaComponent implements OnInit, OnDestroy {
  dfa: DFA | null = null
  private dfaSubscription?: Subscription

  constructor(private dfaService: DfaService) {}

  ngOnInit(): void {
    this.dfaSubscription = this.dfaService.dfa$.subscribe(dfa => {
      this.dfa = dfa
    })
  }

  ngOnDestroy(): void {
    this.dfaSubscription?.unsubscribe()
  }
}
