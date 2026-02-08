import { Component } from '@angular/core';
import { TransitionTableComponent } from '../transition-table/transition-table.component';
import { DfaComponent } from '../dfa/dfa.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TransitionTableComponent, DfaComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {

}
