import { Component } from '@angular/core';
import { TransitionTableComponent } from '../transition-table/transition-table.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TransitionTableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {

}
