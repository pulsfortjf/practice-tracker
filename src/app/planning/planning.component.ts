import { Component } from '@angular/core';
import { CounterComponent } from '../counter/counter.component';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})

export class PlanningComponent {
  practicingDays = [0, 0, 0, 0, 0, 0, 0];

  counter = new CounterComponent;
  hours = 0;

  onDayToggle(index: number): void {
    let temp = this.practicingDays[index];
    if (temp == 0)
      this.practicingDays[index] = 1;
    else
      this.practicingDays[index] = 0;
    
    console.log(this.practicingDays);
  }

  updateHours() {
    let temp_counter = new CounterComponent;
    let temp_hours = temp_counter.count;

    this.counter = temp_counter;
    this.hours = temp_hours;
    console.log(temp_hours);
    console.log(this.hours);
  }
}
